import dayjs from "dayjs";
import { useCallback, useRef, useState } from "react";
import type { SeriesApiRef } from "lightweight-charts-react-components";
import type { CandlestickData } from "lightweight-charts";
import type {
  ISeriesApi,
  MouseEventParams,
  Time,
  WhitespaceData,
} from "lightweight-charts";
import { green, red } from "@/app/ui/colors";

type LegendData = {
  open?: string;
  high?: string;
  low?: string;
  close?: string;
  time: string;
  color?: string;
  change?: string;
};

const isCandlestickData = (
  data: CandlestickData<Time> | WhitespaceData<Time>,
): data is CandlestickData<Time> => {
  return "close" in data && "open" in data && "high" in data && "low" in data;
};

const timeToString = (time: Time): string => {
  if (typeof time === "number") {
    return dayjs(time * 1000).format("YYYY-MM-DD");
  }

  if (typeof time === "object") {
    const date = new Date(time.year, time.month - 1, time.day);
    return dayjs(date).format("YYYY-MM-DD");
  }

  return time;
};

const mapCandlestickDataToLegendData = ({
  open,
  high,
  low,
  close,
  time,
}: CandlestickData): LegendData => {
  const decreased = open > close;
  const sign = decreased ? "-" : "+";
  const difference = Math.abs(close - open);

  return {
    open: open.toFixed(1),
    high: high.toFixed(1),
    low: low.toFixed(1),
    close: close.toFixed(1),
    time: timeToString(time),
    color: decreased ? red : green,
    change: `${sign}${difference.toFixed(1)} ${sign}${((difference / open) * 100).toFixed(2)}%`,
  };
};

const getLastBarLegendData = (
  s: ISeriesApi<"Candlestick">,
): LegendData | null => {
  const data = s.dataByIndex(Number.MAX_SAFE_INTEGER, -1);

  if (!data) {
    return null;
  }

  if (!isCandlestickData(data)) {
    return null;
  }

  return mapCandlestickDataToLegendData(data);
};

const adata = [
  { time: {year: 481, month: 12, day: 22}, open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
  { time: {year: 481, month: 12, day: 23}, open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
  { time: {year: 481, month: 12, day: 24}, open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
  { time: {year: 481, month: 12, day: 25}, open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
  { time: {year: 481, month: 12, day: 26}, open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
  { time: {year: 481, month: 12, day: 27}, open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
  { time: {year: 481, month: 12, day: 28}, open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
  { time: {year: 481, month: 12, day: 29}, open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
  { time: {year: 481, month: 12, day: 30}, open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
  { time: {year: 481, month: 12, day: 31}, open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
];

const useLegend = (showLegend: boolean) => {
  const ref = useRef<SeriesApiRef<"Candlestick">>(null);
  const [legendData, setLegendData] = useState<LegendData | null>(() =>
    mapCandlestickDataToLegendData(adata[adata.length - 1]),
  );

  const onCrosshairMove = useCallback(
    (param: MouseEventParams) => {
      if (!showLegend) {
        return;
      }

      if (!ref.current) {
        return;
      }

      const seriesApi = ref.current.api();
      if (!seriesApi) {
        return;
      }

      if (!param) {
        return;
      }

      if (!param.time) {
        const lastBarData = getLastBarLegendData(seriesApi);
        setLegendData((prev) =>
          prev?.time !== lastBarData?.time ? lastBarData : prev,
        );
        return;
      }

      const data = param.seriesData.get(seriesApi) as
        | CandlestickData<Time>
        | WhitespaceData<Time>;

      if (!isCandlestickData(data)) {
        setLegendData(null);
        return;
      }

      const newLegendData = mapCandlestickDataToLegendData(data);
      setLegendData((prev) =>
        prev?.time !== newLegendData.time ? newLegendData : prev,
      );
    },
    [setLegendData, showLegend],
  );

  return {
    ref,
    legendData,
    onCrosshairMove,
  };
};

export { useLegend };
