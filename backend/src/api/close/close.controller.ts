import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CloseService } from './close.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parkings } from 'src/db/Parking/parking.entity';
import { ClosePostRequest } from './dto/close.dto';
import { Closes } from 'src/db/Close/close.entity';
import { CloseStatuses } from 'src/db/CloseStatus/closeStatus.entity';
import { CloseStatusList } from './dto/close.dto';

@ApiTags('close')
@Controller('api/close')
export class CloseController {
  constructor(private readonly closeService: CloseService) {}

  @Get('pa-list')
  @ApiOperation({
    operationId: 'pa-list',
    description: 'パーキングエリアのリストを取得する',
  })
  @ApiResponse({
    status: 200,
    description: 'パーキングエリアのリスト',
    type: [Parkings],
  })
  async paList(): Promise<Parkings[]> {
    return await this.closeService.paList();
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
    type: [CloseStatusList],
  })
  async status(): Promise<CloseStatusList[]> {
    return await this.closeService.status();
  }
}
