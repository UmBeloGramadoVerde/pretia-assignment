import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FileOutput {
  @Expose()
  @ApiProperty()
  path: string;
}
