import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { RegisterService } from './register.service';
import { RegisterEntity } from './entities/register.entity';

@Controller('/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(
    @Body() registerUserData: RegisterDto,
    @Res() res: Response,
  ) {
    try {
      const newUserAccount = new RegisterEntity();
      newUserAccount.name = registerUserData.name;
      newUserAccount.email = registerUserData.email;
      newUserAccount.password = registerUserData.password;
      newUserAccount.role = 'user';
      newUserAccount.createdAt = new Date();
      newUserAccount.updateAt = new Date();

      await this.registerService.dbRegisterUser(newUserAccount);

      return res.status(HttpStatus.OK).json({
        message: 'Conta de usuário criada com sucesso',
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return res
          .status(error.getStatus())
          .json({ error: error.getResponse() });
      } else {
        console.log(error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Failed to create user account' });
      }
    }
  }
}
