import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './entities/register.entity';
import { BcryptAdapter } from '../utils/bcrypt-adapter';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity])],
  controllers: [AccountController],
  providers: [AccountService, BcryptAdapter],
})
export class RegisterModule {}
