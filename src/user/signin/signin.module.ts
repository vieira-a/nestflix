import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { SignInController } from './signin.controller';
import { SignInService } from './signin.service';
import { BcryptAdapter } from '../utils';

@Module({
  imports: [AccountModule],
  controllers: [SignInController],
  providers: [SignInService, BcryptAdapter],
})
export class SignInModule {}
