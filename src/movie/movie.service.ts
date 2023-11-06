import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

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
}
