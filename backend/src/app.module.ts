import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/User/user.entity';
import { PitIns } from 'src/db/PitIn/pitIn.entity';
import { PitInModule } from './api/pit-in/pit-in.module';
import { ExampleModule } from './api/example/example.module';
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
      entities: [Users, PitIns, Parkings, ParkingRoads],
    }),
    PitInModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
