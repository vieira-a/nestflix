import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { SignInDto } from './dto/signin.dto';
import { BcryptAdapter } from '../utils/bcrypt-adapter';

@Injectable()
export class SignInService {
  constructor(
    private readonly accountService: AccountService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(signInData: SignInDto) {
    const userAccount = await this.accountService.dbLoadUserAccountByEmail(
      signInData.email,
    );

    const userPasswordIsValid = await this.bcryptAdapter.checkPassword(
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
