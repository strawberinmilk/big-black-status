import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInRequest } from './dto/check-in.dto';

@Controller('check-in')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post('get-current-parking')
  checkLocationParking(
    @Body(new ValidationPipe()) checkInRequest: CheckInRequest,
  ) {
    return this.checkInService.checkLocationParking(checkInRequest);
  }

  @Post()
  create(@Body(new ValidationPipe()) checkInRequest: CheckInRequest) {
    return this.checkInService.create(checkInRequest);
  }
}
