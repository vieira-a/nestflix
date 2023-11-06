import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { Response } from 'express';

@Controller('/movies')
export class MovieController {
  @Post()
  async registerMovie(@Body() movieData: MovieDto, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        message: 'Filme cadastrado com sucesso',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
