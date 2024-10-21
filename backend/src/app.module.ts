import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/db/User/user.entity';
import { CheckIns } from 'src/db/CheckIn/checkIn.entity';
import { CheckInModule } from './api/check-in/check-in.module';
import { Parkings } from './db/Parking/parking.entity';
import { ParkingRoads } from './db/ParkingRoads/ParkingRoad.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        logging: true,
        synchronize: true, // TODO: false
        timezone: 'UTC',
        entities: [Users, CheckIns, Parkings, ParkingRoads],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CheckInModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
