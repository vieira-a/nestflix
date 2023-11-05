import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignInService } from './signin.service';
import { Response } from 'express';

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
      console.log(error);
    }
  }
}
