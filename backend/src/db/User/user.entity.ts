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
import { CheckIns } from 'src/db/CheckIn/checkIn.entity';

@Unique(['id', 'screenName', 'email'])
@Entity()
export class Users {
  @PrimaryGeneratedColumn({
    name: 'id',
    unsigned: true,
    type: 'smallint',
    comment: 'ユーザID',
  })
  @IsInt()
  readonly id: number;

  @Column('varchar', { comment: 'スクリーンネーム', unique: true })
  screenName: string;

  @Column('varchar', { comment: '名前' })
  name: string;

  @Column('varchar', { comment: 'メールアドレス', unique: true })
  email: string;

  @Column('varchar', { comment: 'パスワード' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CheckIns, (checkIns) => checkIns.user)
  checkIns?: CheckIns[];
}
