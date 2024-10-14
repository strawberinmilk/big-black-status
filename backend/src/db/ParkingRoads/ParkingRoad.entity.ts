import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Parkings } from '../Parking/parking.entity';

@Unique(['id'])
@Entity()
export class ParkingRoads {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
    comment: 'パーキング道路ID',
  })
  readonly id: number;

  @ManyToOne(() => Parkings, (parking) => parking.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'parkingId' })
  parking: Parkings;

  @Column('varchar', { comment: '道路名', unique: true })
  name: string;
}
