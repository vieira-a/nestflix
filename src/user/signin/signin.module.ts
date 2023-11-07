import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { SignInController } from './signin.controller';
import { SignInService } from './signin.service';

@Module({
  imports: [AccountModule],
  controllers: [SignInController],
  providers: [SignInService],
})
export class SignInModule {}
