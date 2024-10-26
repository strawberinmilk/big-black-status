import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckInRepository } from 'src/db/CheckIn/checkIn.repository';
import { UserRepository } from 'src/db/User/user.repository';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { Parkings } from 'src/db/Parking/parking.entity';
import {
  GetCurrentParkingRequest,
  GetUserHereRequest,
  PostCheckInRequest,
} from './dto/check-in.dto';
import * as turf from '@turf/turf';
import { MoreThan } from 'typeorm';

import { ParkingRoadRepository } from 'src/db/ParkingRoads/ParkingRoad';
import { ParkingRoads } from 'src/db/ParkingRoads/ParkingRoad.entity';
import { CheckIns } from 'src/db/CheckIn/checkIn.entity';

import { DateUtilService } from 'src/util/dateUtil/dateUtil.service';

@Injectable()
export class CheckInService {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly userRepository: UserRepository,
    private readonly parkingRepository: ParkingRepository,
    private readonly parkingRoadRepository: ParkingRoadRepository,
    private readonly dateUtil: DateUtilService,
  ) {}

  /**
   * 今いるパーキングエリアを取得
   * @param req
   * @returns
   */
  async checkLocationParking(req: GetCurrentParkingRequest): Promise<Parkings> {
    // 今いるパーキングエリアを取得
    const currentParking = await this.getCurrentParking(
      req.latitude,
      req.longitude,
    );
    return currentParking;
  }

  /**
   * チェックイン
   * @param req
   * @returns
   */
  async create(req: PostCheckInRequest): Promise<ParkingRoads> {
    // ユーザが存在するか確認
    const user = await this.userRepository.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      throw new BadRequestException('ユーザーが存在しません');
    }

    // 連続チェックインにならないか確認
    const checkIns = await this.checkInRepository.find({
      where: {
        createdAt: MoreThan(this.dateUtil.getTimeBeforeNow(2, 'hour')),
      },
      relations: {
        parkingRoad: true,
      },
    });
    if (checkIns.length && checkIns[0].parkingRoad.id === req.roadId) {
      throw new BadRequestException('連続チェックインはできません');
    }

    // 道路が存在するか確認
    const parkingRoad = (
      await this.parkingRoadRepository.find({
        relations: { parking: true },
        where: { id: req.roadId },
      })
    )[0];
    if (!parkingRoad) {
      throw new BadRequestException('道路が存在しません');
    }

    // パーキングエリアにいるか確認
    try {
      await this.getCurrentParking(req.latitude, req.longitude);
    } catch {
      throw new BadRequestException('パーキングエリアにいません');
    }

    // チェックイン
    await this.checkInRepository.save({
      user,
      parkingRoad,
      latitude: req.latitude,
      longitude: req.longitude,
    });

    return parkingRoad;
  }

  /**
   * パーキングエリアの近くにいるか判定(Private)
   * @param latitude 緯度
   * @param longitude 経度
   */
  private async getCurrentParking(
    inputLat: number,
    inputLon: number,
  ): Promise<Parkings> {
    // パーキングエリアのリストを取得
    const parkingList = await this.parkingRepository.find({
      relations: ['parkingRoads'],
    });
    // 範囲内のパーキングエリアを取得
    const currentParking = parkingList.find((parking) => {
      const [paLat, paLon] = [parking.latitude, parking.longitude];

      const from = turf.point([inputLon, inputLat]);
      const to = turf.point([paLon, paLat]);
      const distance = turf.distance(from, to);
      if (distance < parking.radius / 1000) {
        return true;
      }
    });
    if (!currentParking) {
      throw new BadRequestException('パーキングエリアにいません');
    }
    return currentParking;
  }

  /**
   * 現在パーキングにいるユーザを取得
   * @param req
   * @returns
   */
  async getUserHere(req: GetUserHereRequest) {
    const twoHoursAgo = this.dateUtil.getTimeBeforeNow(2, 'hour');
    /*
    // 二時間以内にその駐車場にチェックインしたユーザを取得
    const filterParling = await this.userRepository.find({
      relations: {
        checkIns: {
          parkingRoad: true,
        },
      },
      where: {
        checkIns: {
          parkingRoad: {
            id: req.parkingRoadId,
          },
          createdAt: MoreThan(twoHoursAgo.format()),
        },
      },
    });
    console.log(filterParling);

    // 上記ユーザの二時間以内のすべてのチェックインを取得
    const filterUser = await this.userRepository.find({
      relations: {
        checkIns: {
          parkingRoad: true,
        },
      },
      where: {
        id: In(filterParling.map((user) => user.id)),
        checkIns: {
          createdAt: MoreThan(twoHoursAgo.format()),
        },
      },
      order: {
        checkIns: {
          createdAt: 'DESC',
        },
      },
    });

    // 上記リストから最新チェックインが該当PAのユーザのみを取得
    const result = filterUser.filter((user) => {
      return user.checkIns[0].parkingRoad.id === req.parkingRoadId;
    });

    */

    // SELECT u.*, c.*
    // FROM users u
    // INNER join check_ins as c on u.id = c."userId"
    // INNER JOIN (
    //   SELECT ci."userId", MAX(ci."createdAt") AS "maxTs"
    //   FROM check_ins ci
    //   GROUP BY ci."userId"
    // ) subc ON c."userId" = subc."userId" AND c."createdAt" = subc."maxTs"
    // where c."createdAt" > '2024-10-23 22:17:33.699'
    //   and c."parkingRoadId" = 1
    // order by c."createdAt" desc

    const latestUserCheckIns = await this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.checkIns', 'c')
      .innerJoin(
        (qb) => {
          return qb
            .subQuery()
            .select('ci."userId"', 'userId')
            .addSelect('MAX(ci."createdAt")', 'maxTs')
            .from(CheckIns, 'ci')
            .groupBy('ci."userId"');
        },
        'subc',
        'c."userId" = subc."userId" AND c."createdAt" = subc."maxTs"',
      )
      .where('c."createdAt" > :twoHoursAgo', { twoHoursAgo })
      .andWhere('c."parkingRoadId" = :parkingroadid', {
        parkingroadid: req.parkingRoadId,
      })
      .orderBy('c."createdAt"', 'DESC')
      .getMany();

    return latestUserCheckIns;
  }
}
