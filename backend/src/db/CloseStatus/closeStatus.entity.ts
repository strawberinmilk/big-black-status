import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Closes } from '../Close/close.entity';

@Unique(['id'])
@Entity()
export class CloseStatuses {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
    comment: 'クローズステータスID',
  })
  @ApiProperty({ example: 1 })
  readonly id: number;

  @Column('varchar', { comment: 'ステータス英名' })
  @ApiProperty({ example: 'close' })
  status: string;

  @Column('varchar', { comment: 'ステータス和名' })
  @ApiProperty({ example: '閉鎖' })
  statusJpName: string;

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
