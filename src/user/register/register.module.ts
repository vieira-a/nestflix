import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './entities/register.entity';
import { BcryptAdapter } from '../utils/bcrypt-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity])],
  controllers: [RegisterController],
  providers: [RegisterService, BcryptAdapter],
})
export class RegisterModule {}
