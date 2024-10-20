import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CheckIns } from '../CheckIn/checkIn.entity';
import { ParkingRoads } from '../ParkingRoads/ParkingRoad.entity';

@Unique(['id'])
@Entity()
export class Parkings {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
    comment: 'パーキングエリアID',
  })
  readonly id: number;

  @Column('varchar', { comment: 'PA名', unique: true })
  name: string;

  @Column('decimal', { comment: '経度', unique: true })
  latitude: number;

  @Column('decimal', { comment: '緯度', unique: true })
  longitude: number;

  @Column('smallint', { comment: '半径' })
  radius: number;

  @OneToMany(() => CheckIns, (checkIns) => checkIns.user)
  checkIns?: CheckIns[];

  @OneToMany(() => ParkingRoads, (parkingRoads) => parkingRoads.parking)
  parkingRoads?: ParkingRoads[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
