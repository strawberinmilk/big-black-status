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
import * as dayjs from 'dayjs';
// import 'dayjs/locale/ja';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

@Injectable()
export class CheckInService {
  constructor(
    private readonly checkInRepository: CheckInRepository,
    private readonly userRepository: UserRepository,
    private readonly parkingRepository: ParkingRepository,
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
  async create(req: PostCheckInRequest): Promise<Parkings> {
    const user = await this.userRepository.findById(req.userId);

    if (!user) {
      throw new BadRequestException('ユーザーが存在しません');
    }
    // 今いるパーキングエリアを取得
    const currentParking = await this.getCurrentParking(
      req.latitude,
      req.longitude,
    );
    // チェックイン
    await this.checkInRepository.save({
      user,
      latitude: req.latitude,
      longitude: req.longitude,
      parking: currentParking,
    });

    return currentParking;
  }

  /**
   * パーキングエリアの近くにいるか判定
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

  async getUserHere(req: GetUserHereRequest) {
    const twoHoursAgo = dayjs.tz().subtract(2, 'hour');

    const user = await this.userRepository.find({
      relations: {
        checkIns: true,
      },
      where: {
        checkIns: {
          parking: {
            id: req.parkingId,
          },
          createdAt: MoreThan(twoHoursAgo.format()),
        },
      },
    });
    return user;
  }
}
