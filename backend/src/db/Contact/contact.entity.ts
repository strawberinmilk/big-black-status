import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../User/user.entity';

@Entity()
export class Contacts {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'int',
    comment: 'ユーザID',
  })
  @ApiProperty({ example: 1, description: 'Primary key' })
  id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => Users })
  user: Users;

  @Column('text', { comment: '問い合わせ内容' })
  @ApiProperty({
    example: '問い合わせ内容',
    description: '問い合わせ内容',
  })
  message: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ example: '2024-10-01T00:00:00.000Z' })
  updatedAt: string;
}
