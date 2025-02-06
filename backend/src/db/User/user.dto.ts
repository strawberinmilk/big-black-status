import { Users } from './user.entity';

export enum UserRoleId {
  ADMIN = 0,
  GUEST = 1,
  MEMBER = 2,
}

export enum UserActive {
  TEMPORARY = -1,
  DELETED = 0,
  ACTIVE = 1,
}

/* 
export class BaseUserDto {
  email: string;
  password: string;
}

export class CreateUserDto {
  tmpEmail: string;
  name: string;
  active: number;
  role: number;
}
*/
