import { Button } from "@mui/material";
import { Api } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { ParkingRoads, Parkings, Users } from "../../api/generated";
import { SnackContext } from "../../common/SnackComponent";
import { TitleMolecule } from "../molecules/TitleMolecule";
import { SubTitleMolecule } from "../molecules/SubTitmeMolecule";
import style from "../../style/templates/checkIn.module.scss";
import { AxiosError } from "axios";
import { WaitCircleForm } from "../../common/WaitCircleForm";

export const CheckInTemplate = () => {
  const checkInApi = Api().checkInApi;
  const authApi = Api().authApi;
  const { setSnack } = useContext(SnackContext);
  const { WaitCircle, fourceCircleEnd, fourceCircleStart } = WaitCircleForm();

  const [userId, setUserId] = useState<number>(0);
  const [pageStatus, setPageStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );

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
    fourceCircleStart();
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
        fourceCircleEnd();
      });
    fourceCircleEnd();
    return position;
  };

  // チェックイン
  const checkIn = async (roadId: number) => {
    fourceCircleStart();
    const position = await getCurrentParking();
    if (!position) {
      fourceCircleEnd();
      return;
    }

    await checkInApi
      .checkIn({ roadId, ...position })
      .then(async (res) => {
        setSnack({
          isOpen: true,
          type: "success",
          message: `${res.data.parking.name} ${res.data.name}にチェックインしました`,
        });
        setCurrentParking(res.data.parking);
        setCurrentRoad(res.data);
        await getUserHere(res.data.id);
        fourceCircleEnd();
      })
      .catch((e: AxiosError) => {
        setSnack({
          isOpen: true,
          type: "error",
          message: (e.response?.data as any).message,
        });
        fourceCircleEnd();
      });
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

  // ログイン情報を取得
  const getMe = async () => {
    try {
      const res = await authApi.me();
      setUserId(res.data.id);
      setPageStatus("success");
    } catch {
      setPageStatus("error");
    }
  };

  // ページを開いた時に現在地のパーキングを取得
  useEffect(() => {
    (async () => {
      await getCurrentParking();
      await getMe();
    })();
  }, []);

  return (
    <>
      <TitleMolecule title="チェックイン" />
      {pageStatus === "success" && (
        <>
          {currentParking ? (
            <p>
              <span className={style.currentParking}>
                現在地のパーキング: {currentParking.name}
              </span>
            </p>
          ) : (
            <>
              <p>パーキングエリアにいません</p>
              <Button
                variant="contained"
                onClick={async () => getCurrentParking()}
              >
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

              <a
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                className="twitter-share-button"
                data-size="large"
                data-text={`現在地は${currentParking.name} ${currentRoad.name}です。`}
                data-url={`${import.meta.env.VITE_FRONTEND_URL}`}
                data-hashtags="BigBlackStatus"
                data-lang="ja"
                data-show-count="false"
              >
                Tweet
              </a>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
                charSet="utf-8"
              ></script>

              {/* TODO: タイムラインへの導線 */}
            </>
          )}

          <WaitCircle />
        </>
      )}
      {pageStatus === "error" && (
        <>
          <p>この機能はログインすることでご利用になれます。</p>
          <p>
            ログインしチェックインすることで今このパーキングエリアにいる人を確認することができます。
          </p>
          <p>
            ログインせずに投稿を行うには閉鎖状況画面の投稿からオープンのステータスをご利用ください
          </p>
        </>
      )}
    </>
  );
};
