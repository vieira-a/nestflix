import { Module } from '@nestjs/common';
import { SignInController } from './signin.controller';
import { SignInService } from './signin.service';
import { AccountModule } from '../account/account.module';
import { BcryptAdapter } from '../utils/bcrypt-adapter';

@Module({
  imports: [AccountModule],
  controllers: [SignInController],
  providers: [SignInService, BcryptAdapter],
})
export class SignInModule {}
