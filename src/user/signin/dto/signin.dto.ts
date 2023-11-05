import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty({ message: 'E-mail precisa ser informado' })
  email: string;

  @IsNotEmpty({ message: 'Senha precisa ser informada' })
  password: string;
}
