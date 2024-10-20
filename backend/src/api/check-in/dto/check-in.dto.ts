import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class Point {
  // 経度
  @ApiProperty({
    type: Number,
    description: '経度',
    example: 35.46164868963681,
  })
  @IsNumber()
  @Min(0)
  @Max(90)
  @IsNotEmpty()
  latitude: number;

  // 緯度
  @ApiProperty({
    type: Number,
    description: '緯度',
    example: 139.67996120452884,
  })
  @IsNumber()
  @Min(0)
  @Max(180)
  @IsNotEmpty()
  longitude: number;
}

export class GetCurrentParkingRequest extends Point {}

export class PostCheckInRequest extends Point {
  // ユーザーID
  @ApiProperty({
    type: Number,
    description: 'ユーザID',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
