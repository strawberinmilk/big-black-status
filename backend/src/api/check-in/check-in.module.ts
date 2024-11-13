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
import { ParkingRoadRepository } from 'src/db/ParkingRoads/ParkingRoad.repository';
import { ParkingRoads } from 'src/db/ParkingRoads/ParkingRoad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, CheckIns, Parkings, ParkingRoads]),
  ],
  controllers: [CheckInController],
  providers: [
    CheckInService,
    UserRepository,
    CheckInRepository,
    ParkingRepository,
    ParkingRoadRepository,
  ],
})
export class CheckInModule {}
