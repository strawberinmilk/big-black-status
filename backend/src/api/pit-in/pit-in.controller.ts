import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { PitInService } from './pit-in.service';
import { PitInRequest } from './dto/pit-in.dto';

@Controller('pit-in')
export class PitInController {
  constructor(private readonly pitInService: PitInService) {}

  @Post('get-current-parking')
  checkLocationParking(@Body(new ValidationPipe()) pitInRequest: PitInRequest) {
    return this.pitInService.checkLocationParking(pitInRequest);
  }

  @Post()
  create(@Body(new ValidationPipe()) pitInRequest: PitInRequest) {
    return this.pitInService.create(pitInRequest);
  }
}
