import { IsNotEmpty, IsString } from 'class-validator';

export class MovieDto {
  @IsNotEmpty({ message: 'O título do filme deve ser informado' })
  @IsString({ message: 'O título do filme deve possuir caracteres válidos' })
  title: string;

  @IsNotEmpty({ message: 'O gênero do filme deve ser informado' })
  @IsString({ message: 'O gênero do filme deve possuir caracteres válidos' })
  genre: string;

  @IsNotEmpty({ message: 'A data de lançamento do filme deve ser informado' })
  releaseDate: Date;
}
