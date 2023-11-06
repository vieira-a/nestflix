import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { Response } from 'express';
import { MovieService } from './movie.service';
import { MovieEntity } from './entities/movie.entity';

@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async registerMovie(@Body() movieData: MovieDto, @Res() res: Response) {
    try {
      const newMovie = new MovieEntity();
      newMovie.title = movieData.title;
      newMovie.genre = movieData.genre;
      newMovie.releaseDate = movieData.releaseDate;

      await this.movieService.dbRegisterMovie(newMovie);

      return res.status(HttpStatus.OK).json({
        message: 'Filme cadastrado com sucesso',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
