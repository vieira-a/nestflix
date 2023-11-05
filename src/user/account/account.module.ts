import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEntity } from './entities/register.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { BcryptAdapter } from '../utils';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEntity])],
  controllers: [AccountController],
  providers: [AccountService, BcryptAdapter],
  exports: [AccountService],
})
export class AccountModule {}
