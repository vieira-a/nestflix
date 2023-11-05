import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterEntity } from './entities/register.entity';
import { BcryptAdapter } from '../utils/bcrypt-adapter';
import { dbCheckUserAccount } from '../utils/check-user-account';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly accountRepository: Repository<RegisterEntity>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async dbRegisterUser(registerUserData: RegisterEntity) {
    const userEmailAlreadyExists = await dbCheckUserAccount(
      this.accountRepository,
      'email',
      registerUserData.email,
    );

    if (userEmailAlreadyExists) {
      throw new BadRequestException('E-mail já cadastrado');
    }

    const hashedPassword = await this.bcryptAdapter.encrypt(
      registerUserData.password,
    );
    registerUserData.password = hashedPassword;
    await this.accountRepository.save(registerUserData);
  }

  async dbLoadUserAccountByEmail(email: string) {
    const userEmailAlreadyExists = await dbCheckUserAccount(
      this.accountRepository,
      'email',
      email,
    );

    if (!userEmailAlreadyExists) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    return await this.accountRepository.findOneBy({ email: email });
  }
}
