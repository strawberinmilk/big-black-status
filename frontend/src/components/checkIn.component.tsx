import { Button } from "@mui/material";
import { checkInApi } from "../api/api";
import { useState } from "react";

export const CheckInComponents = () => {
  const [latitude, setLatitude] = useState(0); // 緯度
  const [longitude, setLongitude] = useState(0); // 経度

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
      <h3>チェックイン</h3>
      <Button
        onClick={async () => {
          getLocation();
          await checkInApi
            .checkIn({ userId: 1, latitude, longitude })
            .then((res) => alert(`${res.data.name}`))
            .catch((err) => alert(err.message));
        }}
      >
        test
      </Button>
    </>
  );
};
