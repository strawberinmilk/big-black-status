import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Contacts } from './contact.entity';

@Injectable()
export class ContactRepository extends Repository<Contacts> {
  constructor(private dataSource: DataSource) {
    super(Contacts, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Contacts> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
