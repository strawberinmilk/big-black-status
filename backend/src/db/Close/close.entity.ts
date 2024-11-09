import { ApiProperty } from '@nestjs/swagger';
import {
  Unique,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ParkingRoads } from '../ParkingRoads/ParkingRoad.entity';
import { Users } from '../User/user.entity';
import { CloseStatuses } from '../CloseStatus/closeStatus.entity';

@Unique(['id'])
@Entity()
export class Closes {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, type: 'int' })
  readonly id: number;

  @ManyToOne(() => CloseStatuses, (closeStatus) => closeStatus.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'closeStatusId' })
  @ApiProperty({ type: () => CloseStatuses })
  closeStatus: CloseStatuses;

  @ManyToOne(() => ParkingRoads, (parkingRoad) => parkingRoad.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'parkingRoadId' })
  @ApiProperty({ type: () => ParkingRoads })
  parkingRoad: ParkingRoads;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => Users })
  user: Users;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;
}
