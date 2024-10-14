import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PitInRequest {
  // ユーザーID
  @IsInt()
  @IsNotEmpty()
  userId: number;

  // 経度
  @IsNumber()
  @Min(0)
  @Max(90)
  @IsNotEmpty()
  latitude: number;

  // 緯度
  @IsNumber()
  @Min(0)
  @Max(180)
  @IsNotEmpty()
  longitude: number;
}
