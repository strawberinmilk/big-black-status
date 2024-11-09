import { Users } from '../User/user.entity';

import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
// import { Parkings } from '../Parking/parking.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ParkingRoads } from '../ParkingRoads/ParkingRoad.entity';

@Unique(['id'])
@Entity()
export class CheckIns {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, type: 'int' })
  readonly id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => Users })
  user: Users;

  @ManyToOne(() => ParkingRoads, (parkingRoad) => parkingRoad.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'parkingRoadId' })
  @ApiProperty({ type: () => ParkingRoads })
  parkingRoad: ParkingRoads;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;
}
