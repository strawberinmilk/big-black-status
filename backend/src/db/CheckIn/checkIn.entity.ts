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
import { ApiProperty } from '@nestjs/swagger';

@Unique(['id'])
@Entity()
export class CheckIns {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => Users })
  user: Users;

  @ManyToOne(() => Parkings, (parking) => parking.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'parkingId' })
  @ApiProperty({ type: () => Parkings })
  parking: Parkings;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;
}
