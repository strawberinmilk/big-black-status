import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

class AuthBaseDto {
  @ApiProperty({
    type: String,
    description: 'メールアドレス',
    example: 'hoge@example.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'パスワード',
    example: 'fwe&3FD7Du2',
  })
  @IsString()
  @IsStrongPassword()
  @MaxLength(30)
  @IsNotEmpty()
  password: string;
}

export class AuthSignUpRequest extends AuthBaseDto {
  @ApiProperty({
    type: String,
    description: 'ハンドルネーム',
    example: 'name',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'スクリーンネーム',
    example: 'screenname',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  screenName: string;
}

export class AuthLoginRequest extends AuthBaseDto {}

export class ActiveRequest {
  @ApiProperty({
    type: String,
    description: 'アクティブトークン',
    example: 'a59989d4-2bbe-4371-ad27-b0c3ecbfc513',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
