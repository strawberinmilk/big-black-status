import { Injectable } from '@nestjs/common';
import { DataSource, MoreThan, Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  DateUtilService,
  TIMEFORMAT,
} from 'src/util/dateUtil/dateUtil.service';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(
    private dataSource: DataSource,
    private dateUtilService: DateUtilService,
  ) {
    super(Users, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Users> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmailAndPassword(
    email: string,
    rawPassword: string,
  ): Promise<Users | null> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
    if (!bcrypt.compareSync(rawPassword, user.password)) return null;
    delete user.password;
    return user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
    return user;
  }

  async findByTmpToken(tmpToken: string): Promise<Users | null> {
    const user = await this.findOne({
      where: {
        tmpToken,
        updatedAt: MoreThan(
          this.dateUtilService
            .getTimeBeforeNow(1, 'hour')
            .format(TIMEFORMAT.timestamp),
        ),
      },
    });
    if (!user) return null;
    return user;
  }
}
