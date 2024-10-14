import { Module } from '@nestjs/common';
import { PitInService } from './pit-in.service';
import { PitInController } from './pit-in.controller';
import { Users } from 'src/db/User/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/db/User/user.repository';
import { PitIns } from 'src/db/PitIn/pitIn.entity';
import { PitInRepository } from 'src/db/PitIn/pitin.repository';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { Parkings } from 'src/db/Parking/parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, PitIns, Parkings])],
  controllers: [PitInController],
  providers: [PitInService, UserRepository, PitInRepository, ParkingRepository],
})
export class PitInModule {}
