import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ClosePostRequest {
  @ApiProperty({
    type: Number,
    description: '道路ID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  parkingRoadId: number;

  @ApiProperty({
    type: Number,
    description: '閉鎖ステータスID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  closeStatusId: number;

  @ApiProperty({
    type: Number,
    description: 'ユーザID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
