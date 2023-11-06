import { IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @IsOptional()
  title: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  releaseDate: Date;
}
