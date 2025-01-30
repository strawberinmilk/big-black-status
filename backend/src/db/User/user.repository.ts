import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserOmitPassword } from './user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Users> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmailAndPassSafePass(
    email: string,
    rawPassword: string,
  ): Promise<UserOmitPassword> {
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

  async findByEmailSafePass(email: string): Promise<UserOmitPassword> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    if (!user) return null;
    delete user.password;
    return user;
  }

  async findByTokenSafePass(token: string): Promise<UserOmitPassword> {
    const user = await this.findOne({
      where: {
        tmpToken: token,
      },
    });
    if (!user) return null;
    delete user.password;
    return user;
  }
}
