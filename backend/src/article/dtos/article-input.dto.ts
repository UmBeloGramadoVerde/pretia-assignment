import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  textContent: string;
  
  @ApiProperty()
  @IsString()
  jsonContent: string;

  @ApiProperty()
  imageContent: string;
}

export class UpdateArticleInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  textContent: string;
  
  @ApiProperty()
  @IsString()
  jsonContent: string;

  @ApiProperty()
  imageContent: string;
}
