import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

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
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ error: error.getResponse() });
      } else {
        console.log(error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Houve uma falha ao cadastrar o filme' });
      }
    }
  }
}
