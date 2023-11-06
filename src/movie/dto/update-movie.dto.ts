import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Star Wars',
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'Movie genre',
    example: 'Science fiction',
  })
  @IsOptional()
  genre: string;

  @ApiProperty({
    description: 'Release date',
    example: 'yyyy-MM-dd',
  })
  @IsOptional()
  releaseDate: Date;
}
