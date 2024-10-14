import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Parkings } from './parking.entity';

@Injectable()
export class ParkingRepository extends Repository<Parkings> {
  constructor(private dataSource: DataSource) {
    super(Parkings, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Parkings> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
