import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Star Wars',
  })
  @IsNotEmpty({ message: 'O título do filme deve ser informado' })
  @IsString({ message: 'O título do filme deve possuir caracteres válidos' })
  title: string;

  @ApiProperty({
    description: 'Movie genre',
    example: 'Science fiction',
  })
  @IsNotEmpty({ message: 'O gênero do filme deve ser informado' })
  @IsString({ message: 'O gênero do filme deve possuir caracteres válidos' })
  genre: string;

  @ApiProperty({
    description: 'Release date',
    example: '1977-11-17',
  })
  @IsNotEmpty({ message: 'A data de lançamento do filme deve ser informado' })
  releaseDate: Date;
}
