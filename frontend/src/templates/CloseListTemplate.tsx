import { useContext, useEffect, useState } from "react";
import { closeApi } from "../api/api";
import {
  CloseStatuses,
  CloseStatusLists,
  ParkingRoads,
} from "../api/generated";

import style from "../style/templates/closeList.module.scss";

import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Button, MenuItem, Select } from "@mui/material";
import { ModalGComponent } from "../common/ModalComponent";
import { TitleMolecule } from "../molecules/TitleMolecule";
import { SubTitleMolecule } from "../molecules/SubTitmeMolecule";
import { SnackContext } from "../common/SnackComponent";
import { CLOSE_DISPLAY, HAKO_SHIBA_TATSU_ROAD_ID } from "../common/constants";

export const CloseListTemplate = () => {
  const [userId, /* setUserId */] = useState<number>(1); // TODO: ユーザ機能実装後修正

  const [paRoadList, setPaRoadList] = useState<ParkingRoads[]>([]);
  const [statusList, setStatusList] = useState<CloseStatuses[]>([]);
  const [closeStatusList, setCloseStatusList] = useState<CloseStatusLists>();
  const [currentPaRoadId, setCurrentPaRoadId] = useState<number>(1);
  const [pieData, setPieData] = useState<ChartData<"pie", number[], unknown>>();
  const [barData, setBarData] = useState<ChartData<"bar", number[], unknown>>();
  const [postModalIsOpen, setPostModalIsOpen] = useState<boolean>(false);

  const { setSnack } = useContext(SnackContext);

  const postModalOpen = () => {
    setPostModalIsOpen(true);
  };

  const postModalClose = () => {
    setPostModalIsOpen(false);
  };

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
  );

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

    const every10 = closeStatusList.list[currentPaRoadId].every10MinuteStatus;
    const lineDataSets = Object.keys(every10).map((status) => {
      return {
        label: statusList.find((s) => s.status === status)?.statusJpName,
        lineTension: 0,
        borderColor: statusList.find((s) => s.status === status)?.colorCode,
        backgroundColor: statusList.find((s) => s.status === status)?.colorCode,
        data: Object.keys(every10[status]).map((timeKey) => {
          return every10[status][timeKey];
        }),
        stack: statusList.find((s) => s.status === status)?.group,
      };
    });
    setBarData({
      labels: closeStatusList.list[currentPaRoadId].lineLabels,
      datasets: lineDataSets,
    });
  }, [closeStatusList, currentPaRoadId, statusList]);

  const SelectPa = (
    <Select
      className={style.selectPa}
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
  );

  return (
    <>
      <TitleMolecule title="PAごとの閉鎖状況" />
      <SubTitleMolecule title="閉鎖状況を投稿する" />
      <p>閉鎖状況を投稿できます。皆様の情報提供をお待ちしております。</p>
      <p>なお、すでにPAにいる場合はチェックイン機能をご利用ください。</p>
      <Button variant="contained" onClick={postModalOpen}>
        投稿する
      </Button>

      <SubTitleMolecule title="閉鎖状況を確認する" />
      <p>パーキングを選択し、状況を確認できます。</p>
      <p>チェックインはすでにPAにいる人の投稿ですので確度の高い情報です。</p>
      {SelectPa}

      {pieData && closeStatusList && (
        <>
          <h3>過去30分間の投稿数</h3>
          <Pie
            className={style.pieGraph}
            data={pieData}
            options={{
              plugins: {
                datalabels: {
                  formatter: (value: number, ctx: any) => {
                    return value
                      ? `${ctx.chart.data.labels?.[ctx.dataIndex]}\n${value}件`
                      : "";
                  },
                },
                legend: {
                  labels: {
                    color: "white",
                  },
                },
              },
            }}
          />
        </>
      )}

      <h3>過去6時間の推移</h3>
      {barData && (
        <Bar
          className={style.barGraph}
          data={barData}
          options={{
            plugins: {
              datalabels: {
                formatter: () => {
                  return "";
                },
              },
              legend: {
                labels: {
                  color: "white",
                },
              },
            },
            responsive: true,
            scales: {
              x: {
                ticks: {
                  color: "white",
                },
              },
              y: {
                ticks: {
                  color: "white",
                },
              },
            },
          }}
        />
      )}

      <ModalGComponent isOpen={postModalIsOpen} onClose={postModalClose}>
        <h3>閉鎖状況を投稿する</h3>
        <div>{SelectPa}</div>
        <div>
          {statusList.map((status) => {
            if (status.status === "check_in") return;
            return (
              <Button
                key={status.id}
                style={{
                  backgroundColor: status.colorCode,
                  color: "black",
                }}
                onClick={async () => {
                  try {
                    await closeApi.post({
                      parkingRoadId: currentPaRoadId,
                      closeStatusId: status.id,
                      userId,
                    });
                    setSnack({
                      isOpen: true,
                      type: "success",
                      message: "投稿しました",
                    });
                  } catch {
                    setSnack({
                      isOpen: true,
                      type: "error",
                      message: "投稿に失敗しました",
                    });
                  }
                  postModalClose();
                }}
              >
                {status.statusJpName}
              </Button>
            );
          })}
        </div>
        <div>
          <Button
            variant="contained"
            onClick={async () => {
              try {
                Promise.all(
                  HAKO_SHIBA_TATSU_ROAD_ID.map(async (roadId) => {
                    await closeApi.post({
                      parkingRoadId: roadId,
                      closeStatusId: CLOSE_DISPLAY,
                      userId,
                    });
                  })
                );

                setSnack({
                  isOpen: true,
                  type: "success",
                  message: "投稿しました",
                });
              } catch {
                setSnack({
                  isOpen: true,
                  type: "error",
                  message: "投稿に失敗しました",
                });
              }
            }}
          >
            箱崎辰巳芝浦閉鎖表示
          </Button>
        </div>
        <p>
          既にPAにいる場合はチェックイン機能をご利用ください。確度の高い情報として扱われます。
        </p>
      </ModalGComponent>
    </>
  );
};
