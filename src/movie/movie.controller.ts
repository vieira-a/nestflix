import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { MovieEntity } from './entities/movie.entity';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
import { AuthGuard } from 'src/common/auth-guard';

@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard)
  @Post()
  async registerMovie(@Body() movieData: MovieDto, @Res() res: Response) {
    try {
      const newMovie = new MovieEntity();
      newMovie.title = movieData.title;
      newMovie.genre = movieData.genre;
      newMovie.releaseDate = movieData.releaseDate;

      await this.movieService.dbRegisterMovie(newMovie);

      return res.status(HttpStatus.CREATED).json({
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

  @UseGuards(AuthGuard)
  @Get()
  async loadMovies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Res() res: Response,
  ) {
    try {
      const result = await this.movieService.dbLoadMovies(page, limit);
      return res.status(HttpStatus.OK).json({
        page,
        result,
        total: result.length,
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
          .json({ message: 'Houve uma falha ao carregar filmes' });
      }
    }
  }
}
