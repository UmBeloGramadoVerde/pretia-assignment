import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { AuthorOutput } from './author-output.dto';
import { FileOutput } from './file-output.dto';

export class ArticleOutput {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  textContent: string;

  @Expose()
  @ApiProperty()
  jsonContent: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @Type(() => AuthorOutput)
  @ApiProperty()
  author: AuthorOutput;

  @Expose()
  @Type(() => FileOutput)
  @ApiProperty()
  imageContent: FileOutput;
}
