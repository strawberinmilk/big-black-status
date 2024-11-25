import { useEffect, useState } from "react";
import { closeApi } from "../api/api";
import {
  CloseStatuses,
  CloseStatusLists,
  ParkingRoads,
} from "../api/generated";

import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { MenuItem, Select } from "@mui/material";

export const CloseListComponent = () => {
  const [paRoadList, setPaRoadList] = useState<ParkingRoads[]>([]);
  const [statusList, setStatusList] = useState<CloseStatuses[]>([]);
  const [closeStatusList, setCloseStatusList] = useState<CloseStatusLists>();
  const [currentPaRoadId, setCurrentPaRoadId] = useState<number>(1);
  const [pieData, setPieData] = useState<ChartData<"pie", number[], unknown>>();

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  // 初回情報取得
  useEffect(() => {
    // PA道路リスト
    closeApi.paRoadList().then((res) => {
      setPaRoadList(res.data);
    });
    // ステータスリスト
    closeApi.statusList().then((res) => {
      setStatusList(res.data);
    });
    // 投稿リスト
    closeApi.status().then((res) => {
      setCloseStatusList(res.data);
    });
  }, []);

  // 閲覧中のPA道路又は投稿情報が変更された場合に再描画
  useEffect(() => {
    if (!closeStatusList) return;
    setPieData({
      labels: statusList.map((status) => status.statusJpName),
      datasets: [
        {
          label: "投稿数",
          backgroundColor: statusList.map((status) => status.colorCode),
          data: statusList.map(
            (status) =>
              (
                closeStatusList.list[currentPaRoadId]
                  .last30MinuteStatus as Record<string, number>
              )[status.status]
          ),
        },
      ],
    });
  }, [closeStatusList, currentPaRoadId, statusList]);

  return (
    <>
      <h3>PAごとの閉鎖状況</h3>

      <h5>パーキングを選択</h5>
      <Select
        label="PA"
        value={currentPaRoadId}
        onChange={(e) => setCurrentPaRoadId(e.target.value as number)}
      >
        {paRoadList.map((pa) => (
          <MenuItem key={pa.id} value={pa.id}>
            {pa.parking.name}&nbsp;{pa.name}
          </MenuItem>
        ))}
      </Select>

      {pieData && closeStatusList&& (
        <>
          <h5>過去30分間の投稿数</h5>
          <Pie
            data={pieData}
            options={{
              plugins: {
                datalabels: {
                  formatter: (value: number, ctx: any) => {
                    return value ? ctx.chart.data.labels?.[ctx.dataIndex] : "";
                  },
                },
              },
            }}
          />
          <table>
            <thead>
              <tr>
                <th>ステータス</th>
                <th>投稿数</th>
              </tr>
            </thead>
            <tbody>
              {statusList.map((status) => (
                <tr key={status.id}>
                  <td>{status.statusJpName}</td>
                  <td>
                    {
                      (
                        closeStatusList.list[currentPaRoadId]
                          .last30MinuteStatus as Record<string, number>
                      )[status.status]
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
