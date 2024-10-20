import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import {
  GetCurrentParkingRequest,
  PostCheckInRequest,
} from './dto/check-in.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('check-in')
@Controller('/api/check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('get-current-parking')
  @ApiOperation({
    operationId: 'getCurrentParking',
    description: '現在地のパーキングの情報を取得する',
  })
  checkLocationParking(
    @Body(new ValidationPipe()) checkInRequest: GetCurrentParkingRequest,
  ) {
    return this.checkInService.checkLocationParking(checkInRequest);
  }

  @Post()
  @ApiOperation({
    operationId: 'checkIn',
    description: 'チェックインする',
  })
  create(@Body(new ValidationPipe()) checkInRequest: PostCheckInRequest) {
    return this.checkInService.create(checkInRequest);
  }
}
