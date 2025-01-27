import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactRequest {
  @ApiProperty({
    type: Number,
    description: 'ユーザID',
    example: 1,
    required: false,
  })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiProperty({
    type: String,
    description: '問い合わせ内容',
    example: 'お問い合わせの内容をここに記入してください。',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
