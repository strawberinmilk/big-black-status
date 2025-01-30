import { Users } from 'src/db/User/user.entity';

export type JwtToken = {
  access_token: string;
};

export type JwtPayload = {
  sub: Users['id'];
  email: Users['email'];
};
