import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Closes } from './close.entity';

@Injectable()
export class CloseRepository extends Repository<Closes> {
  constructor(private dataSource: DataSource) {
    super(Closes, dataSource.createEntityManager());
  }
}
