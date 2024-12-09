import { BadRequestException, Injectable } from '@nestjs/common';
import { CloseRepository } from 'src/db/Close/close.repository';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { ClosePostRequest, CloseStatusLists } from './dto/close.dto';
import { CloseStatusRepository } from 'src/db/CloseStatus/closeStatus.repository';
import { UserRepository } from 'src/db/User/user.repository';
import { ParkingRoadRepository } from 'src/db/ParkingRoads/ParkingRoad.repository';
import { Closes } from 'src/db/Close/close.entity';
import {
  DateUtilService,
  TIMEFORMAT,
} from 'src/util/dateUtil/dateUtil.service';
import { CloseStatuses } from 'src/db/CloseStatus/closeStatus.entity';
import { CloseStatusList } from './dto/close.dto';
import { ParkingRoads } from 'src/db/ParkingRoads/ParkingRoad.entity';

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

  /**
   * パーキング道路を取得する
   * @returns パーキング道路リスト
   */
  async paRoadList(): Promise<ParkingRoads[]> {
    return this.parkingRoadRepository.find({
      relations: {
        parking: true,
      },
    });
  }

  /**
   * クローズステータスの凡例を取得する
   * @returns クローズステータスの凡例
   */
  async statusList(): Promise<CloseStatuses[]> {
    return this.closeStatusRepository.find({
      order: { id: 'ASC' },
    });
  }

  /**
   * 閉鎖状況を投稿する
   * @param input リクエスト
   * @returns 投稿結果の閉鎖状況
   */
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

  /**
   * 閉鎖状況を取得する
   * @returns 集計された閉鎖状況
   */
  async status(): Promise<CloseStatusLists> {
    const sixHoursAgo = this.dateUtil.getTimeBeforeNow(6, 'hour');
    const sixHoursAgoStr = sixHoursAgo.format();

    // パーキング道路に紐づくユーザごとに最新の投稿を取得
    const parkingRoadClose = await this.parkingRoadRepository
      .createQueryBuilder('parkingRoad')
      .leftJoinAndSelect('parkingRoad.parking', 'parking')
      // .leftJoinAndSelect(
      //   'parkingRoad.closes',
      //   'close',
      //   `close.updatedAt > :sixHoursAgo
      //   AND close.updatedAt = (
      //     SELECT MAX(subClose."updatedAt")
      //     FROM closes subClose
      //     WHERE subClose."parkingRoadId" = close."parkingRoadId"
      //     AND subClose."userId" = close."userId"
      //   )`,
      //   { sixHoursAgo: sixHoursAgoStr },
      // )
      .leftJoinAndSelect(
        'parkingRoad.closes',
        'close',
        'close.updatedAt > :sixHoursAgo',
        { sixHoursAgo: sixHoursAgoStr },
      )
      // .leftJoinAndSelect(
      //   'parkingRoad.checkIns',
      //   'checkIn',
      //   `checkIn.updatedAt > :sixHoursAgo
      //   AND checkIn.updatedAt = (
      //     SELECT MAX(subCheckIn."updatedAt")
      //     FROM "check_ins" subCheckIn
      //     WHERE subCheckIn."parkingRoadId" = "checkIn"."parkingRoadId"
      //     AND subCheckIn."userId" = "checkIn"."userId"
      //   )`,
      //   { sixHoursAgo: sixHoursAgoStr },
      // )
      .leftJoinAndSelect(
        'parkingRoad.checkIns',
        'checkIn',
        'checkIn.updatedAt > :sixHoursAgo',
        { sixHoursAgo: sixHoursAgoStr },
      )
      .leftJoinAndSelect('close.user', 'user')
      .leftJoinAndSelect('close.closeStatus', 'closeStatus')
      .orderBy('parkingRoad.id', 'ASC')
      .getMany();

    // 10分ごとの時間リストを作成
    let time = sixHoursAgo
      .minute(Math.ceil(sixHoursAgo.minute() / 10) * 10)
      .second(0)
      .millisecond(0);
    const timeList = [];
    const lineLabels = [];
    const now = this.dateUtil.getNowDayJs();
    while (time.isBefore(now)) {
      timeList.push({
        from: time,
        to: time.add(9, 'minute').add(59, 'second').add(999, 'millisecond'),
      });
      lineLabels.push(time.format(TIMEFORMAT.timeDisplay));
      time = time.add(10, 'minute');
    }

    // 集計ひな形のオブジェクトを作成
    const last30MinuteStatusRaw = {};
    const closeStatuses = await this.closeStatusRepository.find();
    const statusKeys = closeStatuses.map((status) => {
      return status.status;
    });
    for (const status of statusKeys) {
      last30MinuteStatusRaw[status] = 0;
    }
    const every10MinuteStatusRaw = {};
    for (const closeStatus of [{ status: 'check_in' }, ...closeStatuses]) {
      every10MinuteStatusRaw[closeStatus.status] = {};
      for (const time of timeList) {
        every10MinuteStatusRaw[closeStatus.status][
          time.from.format(TIMEFORMAT.timeDisplay)
        ] = 0;
      }
    }

    // 集計を実施
    const closeStatusList: { [key: number]: CloseStatusList } = {};
    for (const road of parkingRoadClose) {
      // 集計データを作成
      const roadData: CloseStatusList = {
        parkingId: road.parking.id,
        parkingName: road.parking.name,
        parkingRoadId: road.id,
        parkingRoadName: road.name,
        lineLabels,
        last30MinuteStatus: JSON.parse(JSON.stringify(last30MinuteStatusRaw)),
        every10MinuteStatus: JSON.parse(JSON.stringify(every10MinuteStatusRaw)),
      };

      // 閉鎖状況の集計
      for (const close of road.closes) {
        const updatedAt = this.dateUtil.getDayJs(close.updatedAt);
        for (const time of timeList) {
          if (updatedAt.isAfter(time.from) && updatedAt.isBefore(time.to)) {
            roadData.every10MinuteStatus[close.closeStatus.status][
              time.from.format(TIMEFORMAT.timeDisplay)
            ]++;
          }
        }
        if (this.dateUtil.getTimeBeforeNow(30, 'minute').isBefore(updatedAt)) {
          roadData.last30MinuteStatus[close.closeStatus.status]++;
        }
      }

      // チェックインの集計
      for (const checkIn of road.checkIns) {
        const updatedAt = this.dateUtil.getDayJs(checkIn.updatedAt);
        for (const time of timeList) {
          if (updatedAt.isAfter(time.from) && updatedAt.isBefore(time.to)) {
            roadData.every10MinuteStatus['check_in'][
              time.from.format(TIMEFORMAT.timeDisplay)
            ]++;
          }
        }
        if (this.dateUtil.getTimeBeforeNow(30, 'minute').isBefore(updatedAt)) {
          roadData.last30MinuteStatus['check_in']++;
        }
      }
      closeStatusList[road.id] = roadData;
    }
    return { list: closeStatusList };
  }
}
