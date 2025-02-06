import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/db/User/user.entity';

export class JwtToken {
  @ApiProperty({
    type: String,
    description: 'JWTトークン',
    example: 'eyJhbGciOiJIUzI1NiI...',
  })
  access_token: string;
}

export type JwtPayload = {
  sub: Users['id'];
  email: Users['email'];
};
