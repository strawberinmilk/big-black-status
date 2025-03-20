import { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { DAIKOKU_ROAD_ID } from "../../common/constants";
import style from "../../style/organisms/nowDaikoku.module.scss";

export const NowDaikokuOrganism = () => {
  const { closeApi } = Api();
  const [daikokuInfo, setDaikokuInfo] = useState({
    close: 0,
    open: 0,
    status: "情報なし",
  });
  // 初回情報取得
  useEffect(() => {
    (async () => {
      try {
        // 投稿リスト
        const closeStatusList = (await closeApi.status()).data;
        // ステータスリスト
        const statusList = (await closeApi.statusList()).data;

        const tmpDaikokuInfo = {
          open: 0,
          close: 0,
          status: "情報なし",
        };
        for (const status of statusList) {
          tmpDaikokuInfo[status.group as "open" | "close"] +=
            closeStatusList.list[DAIKOKU_ROAD_ID].last30MinuteStatus[
              status.status
            ];
        }
        if (tmpDaikokuInfo.open === 0 && tmpDaikokuInfo.close === 0) {
          tmpDaikokuInfo.status = "情報なし";
        } else if (tmpDaikokuInfo.open < tmpDaikokuInfo.close) {
          tmpDaikokuInfo.status = "閉鎖中";
        } else {
          tmpDaikokuInfo.status = "解放中";
        }
        setDaikokuInfo(tmpDaikokuInfo);
      } catch {
        // エラー時は何もしない
      }
    })();
  }, []);
  return (
    <div className={style.parent}>
      <span className={style.direction}>大黒方面</span>
      <div className={style.display}>
        <p>大黒PA{daikokuInfo.status}</p>
        <p>
          (解放情報{daikokuInfo.open}件 / 閉鎖情報{daikokuInfo.close}件)
        </p>
      </div>
    </div>
  );
};
