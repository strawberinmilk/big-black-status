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

export class CloseStatusList {
  @ApiProperty({
    type: Number,
    description: 'パーキングID',
    example: 1,
  })
  parkingId: number;

  @ApiProperty({
    type: Number,
    description: 'パーキング名',
    example: 1,
  })
  parkingName: string;

  @ApiProperty({
    type: Number,
    description: 'パーキング道路ID',
    example: 1,
  })
  parkingRoadId: number;

  @ApiProperty({
    type: Number,
    description: 'パーキング道路名',
    example: 1,
  })
  parkingRoadName: string;

  @ApiProperty({
    type: Object,
    description: '閉鎖ステータスID',
    example: {
      '23:00': {
        open: 1,
        display_clear: 0,
        close_display: 2,
        close_real: 1,
      },
    },
  })
  closeStatusSplitTime: {
    [from: string]: {
      [statusName: string]: number;
    };
  };

  @ApiProperty({
    type: Object,
    description: '30分間の投稿数',
    example: {
      open: 1,
      display_clear: 0,
      close_display: 2,
      close_real: 1,
    },
  })
  last30MinuteStatus: {
    [statusName: string]: number;
  };
}
