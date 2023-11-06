import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { isUUID } from 'class-validator';
import { RedisService } from '../common/redis/redis.service';

@Injectable()
export class MovieService {
  private cachedKeys: string[] = [];

  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly redisService: RedisService,
  ) {}

  async dbLoadMovieById(movieId: string) {
    if (!isUUID(movieId)) {
      throw new BadRequestException('Código do filme inválido');
    }
    return await this.movieRepository.findOneBy({ id: movieId });
  }

  async dbRegisterMovie(movieData: MovieEntity) {
    const newMovie = await this.movieRepository.save(movieData);
    const redisClient = this.redisService.getClient();
    await redisClient.set(newMovie.id, JSON.stringify(newMovie));
    this.cachedKeys.push(newMovie.id);
    return newMovie;
  }

  async dbLoadMovies(page?: number, limit?: number) {
    const filter = {
      page,
      limit,
    };

    const allMovies = this.cachedKeys.map(async (key: string) => {
      const redisClient = this.redisService.getClient();
      const cachedMovie = await redisClient.get(key);
      return cachedMovie;
    });

    const cachedMovies = await Promise.all(allMovies);
    if (cachedMovies.length === 0) {
      const queryBuilder = this.movieRepository.createQueryBuilder('movies');
      queryBuilder
        .skip((filter.page - 1) * (filter.limit + 1))
        .take(filter.limit);

      const { entities } = await queryBuilder.getRawAndEntities();
      return entities;
    }
    return cachedMovies.filter((movie) => movie !== null);
  }

  async dbUpdateMovie(id: string, updateMovieData: UpdateMovieDto) {
    const movieToUpdate = await this.dbLoadMovieById(id);
    if (!movieToUpdate) {
      throw new NotFoundException('Filme não encontrado');
    }
    return await this.movieRepository.update(id, updateMovieData);
  }

  async dbDeleteMovie(id: string) {
    const movieToDelete = await this.dbLoadMovieById(id);
    if (!movieToDelete) {
      throw new NotFoundException('Filme não encontrado');
    }
    return await this.movieRepository.delete(id);
  }
}
