import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Parkings } from '../Parking/parking.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CheckIns } from '../CheckIn/checkIn.entity';
import { Closes } from '../Close/close.entity';

@Unique(['id'])
@Entity()
export class ParkingRoads {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
    comment: 'パーキング道路ID',
  })
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ManyToOne(() => Parkings, (parking) => parking.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'parkingId' })
  @ApiProperty({ type: () => Parkings })
  parking: Parkings;

  @Column('varchar', { comment: '道路名' })
  @ApiProperty({ example: '道路名' })
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;

  @OneToMany(() => CheckIns, (checkIns) => checkIns.parkingRoad)
  @ApiProperty({ type: () => CheckIns, isArray: true })
  checkIns?: CheckIns[];

  @OneToMany(() => Closes, (close) => close.closeStatus)
  @ApiProperty({ type: () => Closes, isArray: true })
  close?: Closes[];
}
