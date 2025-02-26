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
    type: [String],
    description: '折れ線グラフラベル',
    example: 1,
  })
  lineLabels: string[];

  @ApiProperty({})
  every10MinuteStatus: {
    [statusName: string]: { [time: string]: number };
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

export class CloseStatusLists {
  @ApiProperty({
    description: '閉鎖状況のリスト',
    type: Object,
    additionalProperties: true,
  })
  list: { [key: number]: CloseStatusList };
}
