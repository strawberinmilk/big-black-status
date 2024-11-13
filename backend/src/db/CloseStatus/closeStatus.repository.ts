import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CloseStatuses } from './closeStatus.entity';

@Injectable()
export class CloseStatusRepository extends Repository<CloseStatuses> {
  constructor(private dataSource: DataSource) {
    super(CloseStatuses, dataSource.createEntityManager());
  }
}
