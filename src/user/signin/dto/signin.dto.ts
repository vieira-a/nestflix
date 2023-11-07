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
    example: 'P@ssword10',
  })
  @IsNotEmpty({ message: 'Senha precisa ser informada' })
  password: string;
}
