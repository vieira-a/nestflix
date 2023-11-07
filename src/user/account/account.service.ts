import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterEntity } from './entities/register.entity';
//import { dbCheckUserAccount } from '../utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountService {
  private readonly salt: number = 12;
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly accountRepository: Repository<RegisterEntity>,
  ) {}

  async dbRegisterUser(registerUserData: RegisterEntity) {
    const userEmailAlreadyExists = await this.dbLoadUserAccountByEmail(
      registerUserData.email,
    );

    if (userEmailAlreadyExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(
      registerUserData.password,
      this.salt,
    );

    await this.accountRepository.save({
      ...registerUserData,
      password: hashedPassword,
    });
  }

  async dbLoadUserAccountByEmail(userEmail: string) {
    const userAccount = this.accountRepository.findOne({
      where: {
        email: userEmail,
      },
    });

    if (!userAccount) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return userAccount;
  }
}
