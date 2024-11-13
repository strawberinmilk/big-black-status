import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ParkingRoads } from './ParkingRoad.entity';

@Injectable()
export class ParkingRoadRepository extends Repository<ParkingRoads> {
  constructor(private dataSource: DataSource) {
    super(ParkingRoads, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<ParkingRoads> {
    return await this.findOne({
      where: {
        id,
      },
    });
  }
}
