import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterEntity } from './entities/register.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly registerRepository: Repository<RegisterEntity>,
  ) {}

  async dbRegisterUser(registerUserData: RegisterEntity) {
    await this.registerRepository.save(registerUserData);
  }
}
