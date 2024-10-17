import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CheckIns } from './checkIn.entity';

@Injectable()
export class CheckInRepository extends Repository<CheckIns> {
  constructor(private dataSource: DataSource) {
    super(CheckIns, dataSource.createEntityManager());
  }
}
