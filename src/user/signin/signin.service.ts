import { SignInDto } from './dto/signin.dto';

export class SignInService {
  async getToken(signInData: SignInDto) {
    console.log(signInData);
  }
}
