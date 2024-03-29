import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterEntity } from './entities/register.entity';
import { RegisterDto } from './dto/register.dto';
import { AccountService } from './account.service';
import { serverError } from '../../shared/exceptions/server-error';

@ApiTags('User signup')
@Controller('/register')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Conta de usuário criada com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'As senhas não conferem',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'E-mail já cadastrado',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Houve uma falha ao criar conta de usuário',
  })
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

      return res.status(HttpStatus.CREATED).json({
        message: 'Conta de usuário criada com sucesso',
      });
    } catch (error) {
      return serverError(
        error,
        res,
        'Houve uma falha ao criar conta de usuário',
      );
    }
  }
}
