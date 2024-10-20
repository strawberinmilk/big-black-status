import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import {
  GetCurrentParkingRequest,
  PostCheckInRequest,
} from './dto/check-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parkings } from 'src/db/Parking/parking.entity';

@ApiTags('check-in')
@Controller('/api/check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('get-current-parking')
  @ApiOperation({
    operationId: 'getCurrentParking',
    description: '現在地のパーキングの情報を取得する',
  })
  @ApiResponse({
    status: 200,
    description: '現在地のパーキングの情報',
    type: Parkings,
  })
  checkLocationParking(
    @Body(new ValidationPipe()) req: GetCurrentParkingRequest,
  ): Promise<Parkings> {
    return this.checkInService.checkLocationParking(req);
  }

  @Post()
  @ApiOperation({
    operationId: 'checkIn',
    description: 'チェックインする',
  })
  @ApiResponse({
    status: 200,
    description: 'チェックインしたパーキングの情報',
    type: Parkings,
  })
  create(
    @Body(new ValidationPipe()) req: PostCheckInRequest,
  ): Promise<Parkings> {
    return this.checkInService.create(req);
  }
}
