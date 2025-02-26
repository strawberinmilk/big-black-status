import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContactRequest {
  @ApiProperty({
    type: String,
    description: '問い合わせ内容',
    example: 'お問い合わせの内容をここに記入してください。',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
