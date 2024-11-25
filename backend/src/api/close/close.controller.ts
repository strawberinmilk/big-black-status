import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CloseService } from './close.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClosePostRequest, CloseStatusLists } from './dto/close.dto';
import { Closes } from 'src/db/Close/close.entity';
import { CloseStatuses } from 'src/db/CloseStatus/closeStatus.entity';
import { ParkingRoads } from 'src/db/ParkingRoads/ParkingRoad.entity';

@ApiTags('close')
@Controller('api/close')
export class CloseController {
  constructor(private readonly closeService: CloseService) {}

  @Get('pa-road-list')
  @ApiOperation({
    operationId: 'pa-road-list',
    description: 'パーキング道路のリストを取得する',
  })
  @ApiResponse({
    status: 200,
    description: 'パーキング道路のリスト',
    type: [ParkingRoads],
  })
  async paRoadList(): Promise<ParkingRoads[]> {
    return await this.closeService.paRoadList();
  }

  @Get('status-list')
  @ApiOperation({
    operationId: 'status-list',
    description: '閉鎖ステータスのリストを取得する',
  })
  @ApiResponse({
    status: 200,
    description: '閉鎖ステータスのリスト',
    type: [CloseStatuses],
  })
  async statusList(): Promise<CloseStatuses[]> {
    return await this.closeService.statusList();
  }

  @Post()
  @ApiOperation({
    operationId: 'post',
    description: '閉鎖状況を投稿する',
  })
  @ApiResponse({
    status: 200,
    description: '投稿結果',
    type: Closes,
  })
  post(@Body(new ValidationPipe()) req: ClosePostRequest): Promise<Closes> {
    return this.closeService.post(req);
  }

  @Get('status')
  @ApiOperation({
    operationId: 'status',
    description: '閉鎖状況を取得する',
  })
  @ApiResponse({
    status: 200,
    description: '閉鎖状況を取得する',
    type: CloseStatusLists,
  })
  async status(): Promise<CloseStatusLists> {
    return await this.closeService.status();
  }
}
