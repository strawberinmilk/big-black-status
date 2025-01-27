import { IsInt } from 'class-validator';
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
import { ApiProperty } from '@nestjs/swagger';
import { Closes } from '../Close/close.entity';
import { Contacts } from '../Contact/contact.entity';

@Unique(['id', 'screenName', 'email'])
@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
    comment: 'ユーザID',
  })
  @IsInt()
  @ApiProperty({ example: 1 })
  readonly id: number;

  @Column('varchar', { comment: 'スクリーンネーム', unique: true })
  @ApiProperty({ example: 'screenname' })
  screenName: string;

  @Column('varchar', { comment: '名前' })
  @ApiProperty({ example: 'name' })
  name: string;

  @Column('varchar', { comment: 'メールアドレス', unique: true })
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @Column('varchar', { comment: 'パスワード' })
  @ApiProperty({ example: 'password' })
  password: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;

  @OneToMany(() => CheckIns, (checkIns) => checkIns.user)
  @ApiProperty()
  checkIns?: CheckIns[];

  @OneToMany(() => Closes, (close) => close.closeStatus)
  @ApiProperty({ type: () => Closes, isArray: true })
  close?: Closes[];

  @OneToMany(() => Contacts, (contact) => contact.user)
  @ApiProperty({ type: () => Contacts, isArray: true })
  contacts?: Contacts[];
}
