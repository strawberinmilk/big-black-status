import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/User/user.entity';
import { CheckIns } from 'src/db/CheckIn/checkIn.entity';
import { CheckInModule } from './api/check-in/check-in.module';
import { Parkings } from './db/Parking/parking.entity';
import { ParkingRoads } from './db/ParkingRoads/ParkingRoad.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      logging: true,
      synchronize: true, // TODO: false
      entities: [Users, CheckIns, Parkings, ParkingRoads],
    }),
    CheckInModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
