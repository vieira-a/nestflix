import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { MovieEntity } from './entities/movie.entity';
import { RegisterMovieDto } from './dto/register-movie.dto';
import { MovieService } from './movie.service';
import { AuthGuard } from '../shared/guards/auth-guard';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { serverError } from '../shared/exceptions/server-error';

@ApiTags('Movies')
@Controller('/movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @UseGuards(AuthGuard)
  @Post()
  async registerMovie(
    @Body() movieData: RegisterMovieDto,
    @Res() res: Response,
  ) {
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
      return serverError(error, res, 'Houve uma falha ao cadastrar filme');
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
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      return serverError(error, res, 'Houve uma falha ao carregar filmes');
    }
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieData: UpdateMovieDto,
    @Res() res: Response,
  ) {
    try {
      await this.movieService.dbUpdateMovie(id, updateMovieData);
      return res.status(HttpStatus.OK).json({
        message: 'Filme atualizado com sucesso',
      });
    } catch (error) {
      return serverError(error, res, 'Houve uma falha ao atualizar filme');
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteMovie(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.movieService.dbDeleteMovie(id);
      return res.status(HttpStatus.OK).json({
        message: 'Filme excluído com sucesso',
      });
    } catch (error) {
      return serverError(error, res, 'Houve uma falha ao excluir filme');
    }
  }
}
