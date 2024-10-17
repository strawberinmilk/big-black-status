import { Users } from 'src/db/User/user.entity';

import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Parkings } from '../Parking/parking.entity';

@Unique(['id'])
@Entity()
export class CheckIns {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ManyToOne(() => Parkings, (parking) => parking.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'parkingId' })
  parking: Parkings;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
