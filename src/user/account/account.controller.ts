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
import { AccountService } from './account.service';
import { RegisterEntity } from './entities/register.entity';

@Controller('/register')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  async registerUser(
    @Body() registerUserData: RegisterDto,
    @Res() res: Response,
  ) {
    try {
      if (registerUserData.password !== registerUserData.passwordConfirmation) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'As senhas não conferem',
        });
      }
      const newUserAccount = new RegisterEntity();
      newUserAccount.name = registerUserData.name;
      newUserAccount.email = registerUserData.email;
      newUserAccount.password = registerUserData.password;
      newUserAccount.role = registerUserData.role;
      newUserAccount.createdAt = new Date();
      newUserAccount.updateAt = new Date();

      await this.accountService.dbRegisterUser(newUserAccount);

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
          .json({ message: 'Houve uma falha ao criar conta de usuário' });
      }
    }
  }
}
