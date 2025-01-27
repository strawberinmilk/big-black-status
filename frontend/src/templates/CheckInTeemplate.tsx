import { Button } from "@mui/material";
import { checkInApi } from "../api/api";
import { useContext, useEffect, useState } from "react";
import { ParkingRoads, Parkings, Users } from "../api/generated";
import { SnackContext } from "../common/SnackComponent";
import { TitleMolecule } from "../molecules/TitleMolecule";
import { SubTitleMolecule } from "../molecules/SubTitmeMolecule";
import style from "../style/templates/checkIn.module.scss";
import { AxiosError } from "axios";

export const CheckInTemplate = () => {
  const [userId, /* setUserId */] = useState<number>(1); // TODO: ユーザ機能実装後修正

  const { setSnack } = useContext(SnackContext);

  // パーキングはページを開いた時点でロード
  const [currentParking, setCurrentParking] = useState<Parkings | null>(null);
  // 道路はチェックインの結果で設定
  const [currentRoad, setCurrentRoad] = useState<ParkingRoads | null>(null);
  const [hereUsers, setHereUsers] = useState<Users[]>([]);

  // 位置情報の取得
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  const getLocation = async () => {
    try {
      const position = await getCurrentPosition();
      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch {
      setSnack({
        isOpen: true,
        type: "error",
        message: "位置情報が取得できませんでした",
      });
    }
  };

  // 現在地のパーキングを取得
  const getCurrentParking = async () => {
    const position = await getLocation();
    if (!position) return;
    await checkInApi
      .getCurrentParking(position)
      .then((res) => setCurrentParking(res.data))
      .catch(() => {
        setSnack({
          isOpen: true,
          type: "error",
          message: "パーキングエリアが取得できませんでした",
        });
      });
    return position;
  };

  // チェックイン
  const checkIn = async (roadId: number) => {
    const position = await getCurrentParking();
    if (!position) return;

    await checkInApi
      .checkIn({ userId, roadId, ...position })
      .then(async (res) => {
        setSnack({
          isOpen: true,
          type: "success",
          message: `${res.data.parking.name} ${res.data.name}にチェックインしました`,
        });
        setCurrentParking(res.data.parking);
        setCurrentRoad(res.data);
        await getUserHere(res.data.id);
      })
      .catch((e: AxiosError) =>
        setSnack({
          isOpen: true,
          type: "error",
          message: (e.response?.data as any).message,
        })
      );
  };

  // チェックイン後パーキングにいるユーザを取得
  const getUserHere = async (parkingRoadId: number) => {
    const res = await checkInApi.getUserHere({ parkingRoadId }).catch(() =>
      setSnack({
        isOpen: true,
        type: "error",
        message: "ユーザーが取得できませんでした",
      })
    );

    if (!res) return;
    setHereUsers(res.data.filter((user) => user.id !== userId));
  };

  // ページを開いた時に現在地のパーキングを取得
  useEffect(() => {
    (async () => getCurrentParking())();
  }, []);

  return (
    <>
      <TitleMolecule title="チェックイン" />
      {currentParking ? (
        <p>
          <span className={style.currentParking}>
            現在地のパーキング: {currentParking.name}
          </span>
        </p>
      ) : (
        <>
          <p>パーキングエリアにいません</p>
          <Button variant="contained" onClick={async () => getCurrentParking()}>
            位置情報をリロード
          </Button>
        </>
      )}
      {currentParking?.parkingRoads?.length && (
        <>
          {currentParking?.parkingRoads?.length === 1 ? (
            // 大黒など上下共通の場合
            <></>
          ) : (
            // 大井など上下別の場合
            <>
              <SubTitleMolecule title="チェックインする路線を選択してください" />
            </>
          )}
          {currentParking?.parkingRoads?.map((road) => {
            return (
              <Button
                variant="contained"
                onClick={async () => {
                  await checkIn(road.id);
                }}
              >
                {currentParking?.parkingRoads?.length === 1
                  ? "チェックインする"
                  : `${road.name}にチェックインする`}
              </Button>
            );
          })}
        </>
      )}
      {currentRoad && currentParking && (
        <>
          <SubTitleMolecule title="チェックイン完了" />
          <p>
            現在地は{currentParking.name} {currentRoad.name}です。
          </p>
          <h3>このパーキングには下記のユーザがいます</h3>
          {hereUsers.length ? (
            hereUsers.map((user) => <p>{user.name}</p>)
          ) : (
            <p>誰もいないようです</p>
          )}
          <p>TODO: Twitter(現𝕏)にも投稿</p>
          {/* TODO: タイムラインへの導線 */}
        </>
      )}
    </>
  );
};
