import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Users } from 'src/db/User/user.entity';

class AuthBaseDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsStrongPassword()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}

export class AuthSignUpRequest extends AuthBaseDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  screenName: string;
}

export class AuthLoginRequest extends AuthBaseDto {}

export class ActiveRequest {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export type PasswordOmitUser = Omit<Users, 'hashedPassword'>;
