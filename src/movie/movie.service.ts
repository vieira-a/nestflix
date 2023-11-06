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

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async dbLoadMovieById(movieId: string) {
    if (!isUUID(movieId)) {
      throw new BadRequestException('Código do filme inválido');
    }
    return await this.movieRepository.findOneBy({ id: movieId });
  }

  async dbRegisterMovie(movieData: MovieEntity) {
    await this.movieRepository.save(movieData);
  }

  async dbLoadMovies(page: number, limit: number) {
    const filter = {
      page,
      limit,
    };

    const queryBuilder = this.movieRepository.createQueryBuilder('movies');
    queryBuilder
      .skip((filter.page - 1) * (filter.limit + 1))
      .take(filter.limit);

    const { entities } = await queryBuilder.getRawAndEntities();
    return entities;
  }

  async dbUpdateMovie(id: string, updateMovieData: UpdateMovieDto) {
    const movieToUpdate = await this.dbLoadMovieById(id);
    if (!movieToUpdate) {
      throw new NotFoundException('Filme não encontrado');
    }
    return await this.movieRepository.update(id, updateMovieData);
  }
}
