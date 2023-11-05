import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from './dto/signin.dto';
import { SignInService } from './signin.service';

@Controller('/signin')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}
  @Post()
  async signin(@Body() signInData: SignInDto, @Res() res: Response) {
    try {
      const token = await this.signInService.getToken(signInData);

      return res.status(HttpStatus.OK).json({
        message: 'Usuário autenticado com sucesso',
        token: token,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        console.log(error);
        return res
          .status(error.getStatus())
          .json({ error: error.getResponse() });
      } else {
        console.log(error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Authentication failure', error });
      }
    }
  }
}
