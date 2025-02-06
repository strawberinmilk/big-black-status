import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import {
  GetCurrentParkingRequest,
  GetUserHereRequest,
  PostCheckInRequest,
} from './dto/check-in.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Parkings } from 'src/db/Parking/parking.entity';
import { Users } from 'src/db/User/user.entity';
import { ParkingRoads } from 'src/db/ParkingRoads/ParkingRoad.entity';
import { MemberAuthGuard } from 'src/guards/guard/member.guard';

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
    type: ParkingRoads,
  })
  create(
    @Body(new ValidationPipe()) req: PostCheckInRequest,
  ): Promise<ParkingRoads> {
    return this.checkInService.create(req);
  }

  @Post('get-user-here')
  @ApiOperation({
    operationId: 'getUserHere',
    description: 'パーキングにいるユーザを取得する',
  })
  @ApiResponse({
    status: 200,
    description: 'パーキングにいるユーザを取得する',
    type: [Users],
  })
  getUserHere(
    @Body(new ValidationPipe()) req: GetUserHereRequest,
  ): Promise<Users[]> {
    return this.checkInService.getUserHere(req);
  }
}
