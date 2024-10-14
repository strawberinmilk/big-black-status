import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './user.entity';

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
}
