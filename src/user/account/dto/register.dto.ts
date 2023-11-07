import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Nome não deve ser vazio' })
  @IsString({ message: 'Nome deve possuir caracteres válidos' })
  @Length(3, 50, { message: 'Nome deve conter de 3 a 50 caracteres' })
  name: string;

  @ApiProperty({
    description: 'User e-mail address',
    example: 'john@contoso.com',
  })
  @IsNotEmpty({ message: 'E-mail não deve ser vazio' })
  @IsEmail({}, { message: 'E-mail deve ser um e-mail válido' })
  @Length(3, 30, { message: 'E-mail deve conter de 3 a 30 caracteres' })
  email: string;

  @ApiProperty({
    description: 'A strong password',
    example: 'P@ssword10',
  })
  @IsNotEmpty({ message: 'Senha precisa ser informada' })
  @IsStrongPassword(
    {},
    { message: 'Senha deve obedecer critérios de complexidade' },
  )
  password: string;

  @ApiProperty({
    description: 'A strong password',
    example: 'P@ssword10',
  })
  @IsNotEmpty({ message: 'Confirmação de senha precisa ser informada' })
  @IsStrongPassword(
    {},
    { message: 'Confirmação de senha deve obedecer critérios de complexidade' },
  )
  passwordConfirmation: string;

  @ApiProperty({
    description: 'User company role',
    example: 'user',
  })
  @IsNotEmpty({ message: 'Perfil do usuário deve ser informado' })
  role: string;
}
