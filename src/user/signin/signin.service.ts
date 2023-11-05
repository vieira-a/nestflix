import { SignInDto } from './dto/signin.dto';
import { AccountService } from '../account/account.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(signInData: SignInDto) {
    const userAccount = await this.accountService.dbLoadUserAccountByEmail(
      signInData.email,
    );

    const payload = { id: userAccount.id };
    return await this.jwtService.signAsync(payload);
  }
}
