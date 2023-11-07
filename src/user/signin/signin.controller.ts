import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto } from './dto/signin.dto';
import { SignInService } from './signin.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { serverError } from '../../shared/exceptions/server-error';

@ApiTags('User signin')
@Controller('/signin')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}
  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário autenticado com sucesso',
    schema: {
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Senha incorreta',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Houve uma falha ao tentar fazer login',
  })
  async signin(@Body() signInData: SignInDto, @Res() res: Response) {
    try {
      const token = await this.signInService.getToken(signInData);

      return res.status(HttpStatus.OK).json({
        message: 'Usuário autenticado com sucesso',
        token: token,
      });
    } catch (error) {
      return serverError(error, res, 'Houve uma falha ao tentar fazer login');
    }
  }
}
