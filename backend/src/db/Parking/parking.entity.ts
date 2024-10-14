import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PitIns } from '../PitIn/pitIn.entity';
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

  @Column('varchar', { comment: 'ユーザ名', unique: true })
  name: string;

  @Column('decimal', { comment: '経度', unique: true })
  latitude: number;

  @Column('decimal', { comment: '緯度', unique: true })
  longitude: number;

  @Column('smallint', { comment: '半径', unique: true })
  radius: number;

  @OneToMany(() => PitIns, (pitIns) => pitIns.user)
  pitIns?: PitIns[];

  @OneToMany(() => ParkingRoads, (parkingRoads) => parkingRoads.parking)
  parkingRoads?: ParkingRoads[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
