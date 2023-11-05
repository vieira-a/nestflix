import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Nome não deve ser vazio' })
  @IsString({ message: 'Nome deve possuir caracteres válidos' })
  @Length(3, 50, { message: 'Nome deve conter de 3 a 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'E-mail não deve ser vazio' })
  @IsEmail({}, { message: 'E-mail deve ser um e-mail válido' })
  @Length(3, 30, { message: 'E-mail deve conter de 3 a 30 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'Senha precisa ser informada' })
  @IsStrongPassword(
    {},
    { message: 'Senha deve obedecer critérios de complexidade' },
  )
  password: string;

  @IsNotEmpty({ message: 'Confirmação de senha precisa ser informada' })
  @IsStrongPassword(
    {},
    { message: 'Confirmação de senha deve obedecer critérios de complexidade' },
  )
  passwordConfirmation: string;
}
