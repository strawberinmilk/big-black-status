import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PitIns } from './pitIn.entity';

@Injectable()
export class PitInRepository extends Repository<PitIns> {
  constructor(private dataSource: DataSource) {
    super(PitIns, dataSource.createEntityManager());
  }
}
