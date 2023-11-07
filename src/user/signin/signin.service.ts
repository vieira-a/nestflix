import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';

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

    const userPasswordIsValid = await bcrypt.compare(
      signInData.password,
      userAccount.password,
    );

    if (!userPasswordIsValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { id: userAccount.id };
    return await this.jwtService.signAsync(payload);
  }
}
