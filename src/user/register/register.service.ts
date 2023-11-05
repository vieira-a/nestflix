import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterEntity } from './entities/register.entity';
import { BcryptAdapter } from '../utils/bcrypt-adapter';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepository: Repository<RegisterEntity>,
    private readonly bcryptAdapter: BcryptAdapter,
  ) {}

  async dbRegisterUser(registerUserData: RegisterEntity) {
    const hashedPassword = await this.bcryptAdapter.encrypt(
      registerUserData.password,
    );
    registerUserData.password = hashedPassword;
    await this.registerRepository.save(registerUserData);
  }
}
