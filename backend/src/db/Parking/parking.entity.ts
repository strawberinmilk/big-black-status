import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ParkingRoads } from '../ParkingRoads/ParkingRoad.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Closes } from '../Close/close.entity';

@Unique(['id'])
@Entity()
export class Parkings {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
    comment: 'パーキングエリアID',
  })
  @ApiProperty({ example: 1 })
  readonly id: number;

  @Column('varchar', { comment: 'PA名', unique: true })
  @ApiProperty({ example: '大黒PA' })
  name: string;

  @Column('decimal', { comment: '経度', unique: true })
  @ApiProperty({ example: 35.46164868963681 })
  latitude: number;

  @Column('decimal', { comment: '緯度', unique: true })
  @ApiProperty({ example: 139.67996120452884 })
  longitude: number;

  @Column('smallint', { comment: '半径' })
  @ApiProperty({ example: 200 })
  radius: number;

  // @OneToMany(() => CheckIns, (checkIns) => checkIns.user)
  // @ApiProperty({ type: () => CheckIns, isArray: true })
  // checkIns?: CheckIns[];

  @OneToMany(() => ParkingRoads, (parkingRoads) => parkingRoads.parking)
  @ApiProperty({ type: () => ParkingRoads, isArray: true })
  parkingRoads?: ParkingRoads[];

  @OneToMany(() => Closes, (close) => close.closeStatus)
  @ApiProperty({ type: () => Closes, isArray: true })
  close?: Closes[];

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;
}
