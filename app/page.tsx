"use client";

import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
import {
  AreaSeries,
  CandlestickSeries,
  Chart,
  HistogramSeries,
  Pane,
  PriceScale,
} from "lightweight-charts-react-components";
import { FC, ReactNode } from "react";
import { create } from "zustand";
import { useLegend } from "@/app/ui/uselegend";
import { blue, green, red } from "@/app/ui/colors";
import { theme } from "@/app/ui/mui";

interface LegendStore {
  legendVisible: boolean;
  setLegendVisible: (visible: boolean) => void;
}

const useLegendStore = create<LegendStore>((set) => ({
  legendVisible: true,
  setLegendVisible: (visible) => set({ legendVisible: visible }),
}));

type LegendProps = {
  children: ReactNode;
};

const Legend: FC<LegendProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "-2rem",
        left: 0,
        backgroundColor: `transparent`,
        padding: 0,
        zIndex: 10,
      }}
    >
      {children}
    </Box>
  );
};

const RsiLegend: FC<LegendProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "34rem",
        left: 0,
        backgroundColor: `transparent`,
        padding: 0,
        zIndex: 10,
      }}
    >
      {children}
    </Box>
  );
};

export default function Home() {
  const { legendVisible, setLegendVisible } = useLegendStore();
  const { ref, legendData, onCrosshairMove } = useLegend(legendVisible);

  const chartOptions = {
    layout: {
      background: { color: "transparent" },
      textColor: "#FFF",
      fontFamily: "Golos Text",
      panes: {
        enableResize: false,
      },
    },
    grid: {
      vertLines: { color: "#1F1F1F" },
      horzLines: { color: "#1F1F1F" },
    },
    panes: {
      resize: false,
    },
  };

  const candlestickOptions = {
    wickUpColor: green,
    upColor: green,
    wickDownColor: red,
    downColor: red,
  };

  const initialData = [
    {
      time: { year: 481, month: 12, day: 22 },
      open: 75.16,
      high: 82.84,
      low: 36.16,
      close: 45.72,
    },
    {
      time: { year: 481, month: 12, day: 23 },
      open: 45.12,
      high: 53.9,
      low: 45.12,
      close: 48.09,
    },
    {
      time: { year: 481, month: 12, day: 24 },
      open: 60.71,
      high: 60.71,
      low: 53.39,
      close: 59.29,
    },
    {
      time: { year: 481, month: 12, day: 25 },
      open: 68.26,
      high: 68.26,
      low: 59.04,
      close: 60.5,
    },
    {
      time: { year: 481, month: 12, day: 26 },
      open: 67.71,
      high: 105.85,
      low: 66.67,
      close: 91.04,
    },
    {
      time: { year: 481, month: 12, day: 27 },
      open: 91.04,
      high: 121.4,
      low: 82.7,
      close: 111.4,
    },
    {
      time: { year: 481, month: 12, day: 28 },
      open: 111.51,
      high: 142.83,
      low: 103.34,
      close: 131.25,
    },
    {
      time: { year: 481, month: 12, day: 29 },
      open: 131.33,
      high: 151.17,
      low: 77.68,
      close: 96.43,
    },
    {
      time: { year: 481, month: 12, day: 30 },
      open: 106.33,
      high: 110.2,
      low: 90.39,
      close: 98.1,
    },
    {
      time: { year: 481, month: 12, day: 31 },
      open: 109.87,
      high: 114.69,
      low: 85.66,
      close: 111.26,
    },
  ];

  const histoData = [
    { time: { year: 481, month: 12, day: 22 }, value: 10335 },
    { time: { year: 481, month: 12, day: 23 }, value: 42302 },
    { time: { year: 481, month: 12, day: 24 }, value: 24312 },
    { time: { year: 481, month: 12, day: 25 }, value: 86312 },
    { time: { year: 481, month: 12, day: 26 }, value: 53312 },
    { time: { year: 481, month: 12, day: 27 }, value: 40312 },
    { time: { year: 481, month: 12, day: 28 }, value: 83012 },
    { time: { year: 481, month: 12, day: 29 }, value: 92322 },
    { time: { year: 481, month: 12, day: 30 }, value: 52312 },
    { time: { year: 481, month: 12, day: 31 }, value: 32323 },
  ];

  const rsiData = [
    { time: { year: 481, month: 12, day: 22 }, value: 30 },
    { time: { year: 481, month: 12, day: 23 }, value: 45 },
    { time: { year: 481, month: 12, day: 24 }, value: 32 },
    { time: { year: 481, month: 12, day: 25 }, value: 76 },
    { time: { year: 481, month: 12, day: 26 }, value: 56 },
    { time: { year: 481, month: 12, day: 27 }, value: 45 },
    { time: { year: 481, month: 12, day: 28 }, value: 32 },
    { time: { year: 481, month: 12, day: 29 }, value: 77 },
    { time: { year: 481, month: 12, day: 30 }, value: 56 },
    { time: { year: 481, month: 12, day: 31 }, value: 34 },
  ];

  return (
    <div className="grid grid-cols-16 gap-2 h-full">
      <div className="col-span-4">{/* product list */}</div>
      <div className="col-span-9 grid grid-rows-[auto_1fr]">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 grid grid-rows-3">
            <p className="row-span-1 my-auto text-xl">Item Name</p>
            <div className="row-span-2 flex flex-row">
              <p className="row-span-2 my-auto mr-2 text-[2.5rem] font-semibold">
                123,456,789.00
              </p>
              <div className="flex flex-col my-auto">
                <p>+0.00</p>
                <p>+0.00%</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-5 text-grey">
            <div className="flex flex-row">
              <p>Open</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Low</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>High</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Data</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Data</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-5 text-grey">
            <div className="flex flex-row">
              <p>Avg Volume</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Sell Volume</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Liquid Mkt Cap</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Data</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
            <div className="flex flex-row">
              <p>Data</p>
              <div className="mx-auto"></div>
              <p className="text-right">Value</p>
            </div>
          </div>
        </div>
        <Box flexDirection="column" position="relative">
          <Chart
            containerProps={{ style: { width: "100%", height: "100%" } }}
            options={chartOptions}
            onCrosshairMove={onCrosshairMove}
          >
            <Pane>
              <CandlestickSeries
                data={initialData}
                options={candlestickOptions}
                ref={ref}
              />
              <HistogramSeries
                options={{
                  priceFormat: {
                    type: "volume",
                  },
                  priceScaleId: "volume",
                  lastValueVisible: false,
                  priceLineVisible: false,
                }}
                data={histoData}
              />
              <PriceScale
                id="volume"
                options={{ scaleMargins: { top: 0.9, bottom: 0 } }}
              />
            </Pane>
            <Pane stretchFactor={0.4}>
              <AreaSeries
                data={rsiData}
                options={{
                  lineColor: blue,
                  lineWidth: 2,
                  topColor: blue,
                  bottomColor: "transparent",
                  autoscaleInfoProvider: () => ({
                    priceRange: {
                      minValue: 5,
                      maxValue: 85,
                    },
                  }),
                }}
              />
            </Pane>
          </Chart>
          <ThemeProvider theme={theme}>
            <Legend>
              <Stack direction="row" useFlexGap gap={1.2}>
                <Typography variant="overline">
                  Open{" "}
                  <Typography color={green} variant="overline">
                    {legendData?.open}
                  </Typography>
                </Typography>
                <Typography variant="overline">
                  High{" "}
                  <Typography color={legendData?.color} variant="overline">
                    {legendData?.high}
                  </Typography>
                </Typography>
                <Typography variant="overline">
                  Low{" "}
                  <Typography color={legendData?.color} variant="overline">
                    {legendData?.low}
                  </Typography>
                </Typography>
                <Typography variant="overline">
                  Close{" "}
                  <Typography color={legendData?.color} variant="overline">
                    {legendData?.close}
                  </Typography>
                </Typography>
                <Typography color={legendData?.color} variant="overline">
                  {legendData?.change}
                </Typography>
              </Stack>
            </Legend>
            <RsiLegend>
              <Stack direction="row" useFlexGap gap={1.2}>
                <Typography variant="overline">
                  RSI{" "}
                  <Typography color={blue} variant="overline">
                    23
                  </Typography>
                </Typography>
              </Stack>
            </RsiLegend>
          </ThemeProvider>
        </Box>
      </div>
      <div className="col-span-3">{/* trade */}</div>
    </div>
  );
}
