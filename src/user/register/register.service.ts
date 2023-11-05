import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterEntity } from './entities/register.entity';
import { BcryptAdapter } from '../utils/bcrypt-adapter';
import { dbCheckUserAccount } from '../utils/check-user-account';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepository: Repository<RegisterEntity>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async dbRegisterUser(registerUserData: RegisterEntity) {
    const userEmailAlreadyExists = await dbCheckUserAccount(
      this.registerRepository,
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
    await this.registerRepository.save(registerUserData);
  }
}
