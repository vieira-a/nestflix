import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'User e-mail',
    example: 'john@contoso.com',
  })
  @IsNotEmpty({ message: 'E-mail precisa ser informado' })
  email: string;

  @ApiProperty({
    description: 'A strong password',
    example:
      '8 digits or more, letters (uppercase and lowercase), numbers and special characters',
  })
  @IsNotEmpty({ message: 'Senha precisa ser informada' })
  password: string;
}
