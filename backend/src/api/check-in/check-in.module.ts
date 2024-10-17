import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInController } from './check-in.controller';
import { Users } from 'src/db/User/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/db/User/user.repository';
import { CheckIns } from 'src/db/CheckIn/checkIn.entity';
import { CheckInRepository } from 'src/db/CheckIn/checkIn.repository';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { Parkings } from 'src/db/Parking/parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, CheckIns, Parkings])],
  controllers: [CheckInController],
  providers: [
    CheckInService,
    UserRepository,
    CheckInRepository,
    ParkingRepository,
  ],
})
export class CheckInModule {}
