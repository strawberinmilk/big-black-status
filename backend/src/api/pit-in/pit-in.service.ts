import { BadRequestException, Injectable } from '@nestjs/common';
import { PitInRequest } from './dto/pit-in.dto';
import { PitInRepository } from 'src/db/PitIn/pitin.repository';
import { UserRepository } from 'src/db/User/user.repository';
import { ParkingRepository } from 'src/db/Parking/parking.repository';
import { Parkings } from 'src/db/Parking/parking.entity';

const R = Math.PI / 180;

const parkingList = [
  {
    name: '大黒PA',
    lat: 35.46164868963681,
    lng: 139.67996120452884,
    radius: 200,
  },
];

@Injectable()
export class PitInService {
  constructor(
    private readonly pitInRepository: PitInRepository,
    private readonly userRepository: UserRepository,
    private readonly parkingRepository: ParkingRepository,
  ) {}

  /**
   * 今いるパーキングエリアを取得
   * @param pitInRequest
   * @returns
   */
  async checkLocationParking(pitInRequest: PitInRequest) {
    // 今いるパーキングエリアを取得
    const currentParking = await this.getCurrentParking(
      pitInRequest.latitude,
      pitInRequest.longitude,
    );
    return currentParking;
  }

  /**
   * ピットイン
   * @param pitInRequest
   * @returns
   */
  async create(pitInRequest: PitInRequest) {
    const user = await this.userRepository.findById(pitInRequest.userId);

    // 今いるパーキングエリアを取得
    const currentParking = await this.getCurrentParking(
      pitInRequest.latitude,
      pitInRequest.longitude,
    );
    // ピットイン
    await this.pitInRepository.save({
      user,
      latitude: pitInRequest.latitude,
      longitude: pitInRequest.longitude,
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
      let [paLat, paLon] = [parking.latitude, parking.longitude];

      inputLat *= R;
      inputLon *= R;
      paLat *= R;
      paLon *= R;
      const km =
        6371 *
        Math.acos(
          Math.cos(inputLat) * Math.cos(paLat) * Math.cos(paLon - inputLon) +
            Math.sin(inputLat) * Math.sin(paLat),
        );

      if (km * 1000 < parking.radius) {
        return true;
      }
    });
    if (!currentParking) {
      throw new BadRequestException('パーキングエリアにいません');
    }
    return currentParking;
  }
}
