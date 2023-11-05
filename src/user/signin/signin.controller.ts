import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';

@Controller('/signin')
export class SignInController {
  @Post()
  async signin(@Body() signInData: SignInDto, @Res() res: Response) {
    try {
      return res.status(HttpStatus.OK).json({
        message: 'Usuário autenticado com sucesso',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
