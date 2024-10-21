import { Button } from "@mui/material";
import { checkInApi } from "../api/api";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { Parkings } from "../api/generated";

export const CheckInComponents = () => {
  const userId = 1; // TODO: ユーザ機能実装後修正

  const [currentParking, setCurrentParking] = useState<Parkings | null>(null);
  const [checkIned, setCheckIned] = useState<boolean>(false);

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
      alert("位置情報が取得できませんでした");
    }
  };

  useEffect(() => {
    (async () => {
      const position = await getLocation();
      if (!position) return;
      await checkInApi
        .getCurrentParking(position)
        .then((res) => setCurrentParking(res.data));
    })();
  }, []);

  return (
    <>
      <h3>チェックイン</h3>
      {currentParking ? (
        <p>現在地の駐車場: {currentParking.name}</p>
      ) : (
        <p>パーキングエリアにいません</p>
      )}

      {currentParking?.parkingRoads.map((road) => {
        return (
          <Button
            onClick={async () => {
              const position = await getLocation();
              if (!position) return;
              await checkInApi
                .checkIn({ userId: 1, ...position })
                .then(async (res) => {
                  alert(
                    `${res.data.name} ${res.data.parkingRoads[0].name}にチェックインしました`
                  );
                  await setCurrentParking(res.data);
                  setCheckIned(true);
                })
                .catch((err) => alert(err.message));
            }}
          >
            {road.name}
          </Button>
        );
      })}

      {checkIned && (
        <>
          <p>TODO: Twitter(現𝕏)にも投稿</p>
          <p>TODO: タイムラインへの導線</p>
          <p>TODO: 今いる人を出す</p>
        </>
      )}

      <Button onClick={async()=>{
        if (!currentParking) return;
        const user = await checkInApi.getUserHere({ parkingId: currentParking?.id })
        console.log(user.data)
      }}>test</Button>
    </>
  );
};
