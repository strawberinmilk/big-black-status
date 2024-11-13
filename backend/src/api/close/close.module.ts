import { Module } from '@nestjs/common';
import { CloseService } from './close.service';
import { CloseController } from './close.controller';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { CloseStatusRepository } from 'src/db/CloseStatus/closeStatus.repository';
import { UserRepository } from 'src/db/User/user.repository';
import { CloseRepository } from 'src/db/Close/close.repository';
import { ParkingRoadRepository } from 'src/db/ParkingRoads/ParkingRoad.repository';

@Module({
  controllers: [CloseController],
  providers: [
    ParkingRepository,
    ParkingRoadRepository,
    CloseService,
    CloseStatusRepository,
    UserRepository,
    CloseRepository,
  ],
})
export class CloseModule {}
