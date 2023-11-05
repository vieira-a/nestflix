import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

export class SignInService {
  constructor(private readonly jwtService: JwtService) {}
  async getToken(signInData: SignInDto) {
    return await this.jwtService.signAsync(signInData.password);
  }
}
