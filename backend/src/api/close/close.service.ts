import { Injectable } from '@nestjs/common';
import { CloseRepository } from 'src/db/Close/close.repository';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { ClosePostRequest } from './dto/close.dto';
import { CloseStatusRepository } from 'src/db/CloseStatus/closeStatus.repository';
import { UserRepository } from 'src/db/User/user.repository';
import { ParkingRoadRepository } from 'src/db/ParkingRoads/ParkingRoad.repository';
import { Closes } from 'src/db/Close/close.entity';
import {
  DateUtilService,
  TIMEFORMAT,
} from 'src/util/dateUtil/dateUtil.service';
import { DataSource, MoreThan, QueryBuilder } from 'typeorm';
import dayjs from 'dayjs';
import { ParkingRoads } from 'src/db/ParkingRoads/ParkingRoad.entity';
import { Parkings } from 'src/db/Parking/parking.entity';
import { CloseStatuses } from 'src/db/CloseStatus/closeStatus.entity';
import { CloseStatusList } from './dto/close.dto';

@Injectable()
export class CloseService {
  constructor(
    private readonly parkingRepository: ParkingRepository,
    private readonly parkingRoadRepository: ParkingRoadRepository,
    private readonly closeRepository: CloseRepository,
    private readonly closeStatusRepository: CloseStatusRepository,
    private readonly userRepository: UserRepository,
    private readonly dateUtil: DateUtilService,
  ) {}

  async paList(): Promise<Parkings[]> {
    return this.parkingRepository.find({
      relations: {
        parkingRoads: true,
      },
    });
  }

  async statusList(): Promise<CloseStatuses[]> {
    return this.closeStatusRepository.find();
  }

  async post(input: ClosePostRequest): Promise<Closes> {
    const closeStatus = await this.closeStatusRepository.findOne({
      where: { id: input.closeStatusId },
    });
    const user = await this.userRepository.findOne({
      where: { id: input.userId },
    });
    const parkingRoad = await this.parkingRoadRepository.findOne({
      where: { id: input.parkingRoadId },
    });
    return await this.closeRepository.save({
      closeStatus,
      parkingRoad,
      user,
    });
  }

  async status(): Promise<CloseStatusList[]> {
    const sixHoursAgo = this.dateUtil.getTimeBeforeNow(6, 'hour');
    const sixHoursAgoStr = sixHoursAgo.format();
    console.log(sixHoursAgoStr);

    const parkingRoadClose = await this.parkingRoadRepository
      .createQueryBuilder('parkingRoad')
      .leftJoinAndSelect('parkingRoad.parking', 'parking')
      .leftJoinAndSelect(
        'parkingRoad.closes',
        'close',
        `close.updatedAt > :sixHoursAgo
        AND close.updatedAt = (
          SELECT MAX(subClose."updatedAt")
          FROM closes subClose
          WHERE subClose."parkingRoadId" = close."parkingRoadId"
          AND subClose."userId" = close."userId"
        )`,
        // `close.updatedAt > :sixHoursAgo
        // AND close.updatedAt = (
        // ${this.closeRepository
        //   .createQueryBuilder()
        //   .select('MAX(subClose.updatedAt)', 'maxUpdatedAt')
        //   .from(Closes, 'subClose')
        //   .where('subClose.parkingRoadId = parkingRoad.close.parkingRoadId')
        //   .andWhere('subClose.userId = parkingRoad.close.userId')
        //   .getQuery()}
        // )
        //   `,
        { sixHoursAgo: sixHoursAgoStr },
      )
      .leftJoinAndSelect('close.user', 'user')
      .leftJoinAndSelect('close.closeStatus', 'closeStatus')
      .orderBy('parkingRoad.id', 'ASC')
      .getMany();

    // console.log(parkingRoadClose);
    //sixHoursAgo

    let time = sixHoursAgo
      .minute(Math.ceil(sixHoursAgo.minute() / 10) * 10)
      .second(0)
      .millisecond(0);

    const timeList = [];

    const now = this.dateUtil.getNowDayJs();

    while (time.isBefore(now)) {
      timeList.push({
        from: time,
        to: time.add(9, 'minute').add(59, 'second').add(999, 'millisecond'),
      });
      time = time.add(10, 'minute');
    }

    const statusKeys = (await this.closeStatusRepository.find()).map(
      (status) => {
        return status.status;
      },
    );
    const closeStatusRaw = {};
    for (const status of statusKeys) {
      closeStatusRaw[status] = 0;
    }

    const closeStatusList: CloseStatusList[] = [];
    for (const road of parkingRoadClose) {
      const roadData: CloseStatusList = {
        parkingId: road.parking.id,
        parkingName: road.parking.name,
        parkingRoadId: road.id,
        parkingRoadName: road.name,
        closeStatusSplitTime: {},
        last30MinuteStatus: JSON.parse(JSON.stringify(closeStatusRaw)),
      };
      for (const time of timeList) {
        roadData.closeStatusSplitTime[
          time.from.format(TIMEFORMAT.timeDisplay)
        ] = JSON.parse(JSON.stringify(closeStatusRaw));
      }

      for (const close of road.closes) {
        const updatedAt = this.dateUtil.getDayJs(close.updatedAt);
        for (const time of timeList) {
          if (updatedAt.isAfter(time.from) && updatedAt.isBefore(time.to)) {
            roadData.closeStatusSplitTime[
              time.from.format(TIMEFORMAT.timeDisplay)
            ][close.closeStatus.status]++;
          }
        }
        if (this.dateUtil.getTimeBeforeNow(30, 'minute').isBefore(updatedAt)) {
          roadData.last30MinuteStatus[close.closeStatus.status]++;
        }
      }
      closeStatusList.push(roadData);
    }

    return closeStatusList;
  }
}
