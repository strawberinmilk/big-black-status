import { useState } from "react";
import { Button } from "@mui/material";
import { checkInApi } from "./api/api";
const App = () => {
  const parkingList = [
    {
      name: "大黒PA",
      lat: 35.46164868963681,
      lng: 139.67996120452884,
      radius: 200,
    },
  ];

  const [lat, setLatitude] = useState(0); // 緯度
  const [lng, setLongitude] = useState(0); // 経度

  // 二地点間の距離の取得
  const R = Math.PI / 180;
  const distance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;
    const km =
      6371 *
      Math.acos(
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
          Math.sin(lat1) * Math.sin(lat2)
      );
    return km * 1000;
  };

  // 位置情報の取得
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      getLocationSuccess,
      getLocationError
    );
  };
  const getLocationSuccess = (position: GeolocationPosition) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const getLocationError = (/* error: GeolocationPositionError */) => {
    alert("位置情報が取得できませんでした");
  };

  return (
    <>
      <Button onClick={getLocation}>位置取得</Button>
      <p>緯度: {lat}</p>
      <p>経度: {lng}</p>
      <p>
        大黒との距離:{" "}
        {distance(lat, lng, parkingList[0].lat, parkingList[0].lng)}
      </p>
      {distance(lat, lng, parkingList[0].lat, parkingList[0].lng) <
      parkingList[0].radius ? (
        <p>ここは大黒です</p>
      ) : (
        <p>ここは大黒ではありません</p>
      )}
      <p></p>

      <Button
        onClick={async () => {
          await checkInApi
            .checkIn({ userId: 1, latitude: lat, longitude: lng })
            .then((res) => alert("チェックインしました"))
            .catch((err) => alert(err));
        }}
      >
        test
      </Button>
    </>
  );
};

export default App;
