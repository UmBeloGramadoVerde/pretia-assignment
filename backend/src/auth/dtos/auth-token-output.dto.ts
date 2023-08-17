import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ROLE } from '../constants/role.constant';
import { ObjectId } from 'typeorm';

export class AuthTokenOutput {
  @Expose()
  @ApiProperty()
  accessToken: string;

  @Expose()
  @ApiProperty()
  refreshToken: string;
}

export class UserAccessTokenClaims {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  roles: ROLE[];
}

export class UserRefreshTokenClaims {
  id: ObjectId;
}
