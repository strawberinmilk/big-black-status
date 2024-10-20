import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Parkings } from '../Parking/parking.entity';
import { ApiProperty } from '@nestjs/swagger';

@Unique(['id'])
@Entity()
export class ParkingRoads {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
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

  @CreateDateColumn()
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: Date;
}
