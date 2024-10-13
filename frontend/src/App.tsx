import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [latitude, setLatitude] = useState(0); // 緯度
  const [longitude, setLongitude] = useState(0); // 経度

  function successCallback(position: GeolocationPosition) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  function errorCallback(error: GeolocationPositionError) {
    alert("位置情報が取得できませんでした");
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <>
      <p>緯度: {latitude}</p>
      <p>経度: {longitude}</p>
    </>
  );
};

export default App