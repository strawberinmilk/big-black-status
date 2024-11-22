import { useEffect, useState } from "react";
import { closeApi } from "../api/api";
import { CloseStatuses, CloseStatusList, Parkings } from "../api/generated";

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
  const [paList, setPaList] = useState<Parkings[]>([]);
  const [statusList, setStatusList] = useState<CloseStatuses[]>([]);
  const [closeStatusList, setCloseStatusList] = useState<CloseStatusList[]>();

  const [currentPA, setCurrentPA] = useState<number>(0);
  const [pieData, setPieData] = useState<ChartData<"pie", number[], unknown>>();

  // console.log(closeStatusList?.[0].last30MinuteStatus);
  // console.log(statusList);

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

  // 初回情報取得
  useEffect(() => {
    // PAリスト
    closeApi.paList().then((res) => {
      setPaList(res.data);
    });
    // ステータスリスト
    closeApi.statusList().then((res) => {
      setStatusList(res.data);
    });
    // 過去30分の投稿リスト
    closeApi.status().then((res) => {
      setCloseStatusList(res.data);
    });
  }, []);

  useEffect(() => {
    if (!closeStatusList) return;
    setPieData({
      labels: statusList.map((status) => status.statusJpName),
      datasets: [
        {
          label: "投稿数",
          data: statusList.map(
            (status) =>
              (
                closeStatusList[currentPA].last30MinuteStatus as Record<
                  string,
                  number
                >
              )[status.status]
          ),
          backgroundColor: ["green", "yellow", "pink", "red"],
          borderColor: ["green", "yellow", "pink", "red"],
          borderWidth: 1,
        },
      ],
    });
  }, [closeStatusList, currentPA]);

  return (
    <>
      <h3>PAごとの閉鎖状況</h3>

      <Select
        // value={paList}
        label="PA"
        onChange={(e) => (setCurrentPA(e.target.value as number))}
      >
        {paList.map((pa) => (
          <MenuItem key={pa.id} value={pa.id}>
            {pa.name}
          </MenuItem>
        ))}
      </Select>

      {pieData && (
        <>
          <Pie
            data={pieData}
            options={{
              plugins: {
                datalabels: {
                  formatter: (value: number, ctx: any) => {
                    return ctx.dataset.data[ctx.dataIndex]
                      ? ctx.chart.data.labels?.[ctx.dataIndex]
                      : "";
                  },
                },
              },
            }}
          />
        </>
      )}
    </>
  );
};
