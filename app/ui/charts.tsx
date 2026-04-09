"use client"

import {
  AreaSeries,
  CandlestickSeries,
  Chart,
  HistogramSeries,
  Pane,
  PriceScale,
  TimeScale,
} from "lightweight-charts-react-components"
import { RefObject } from "react"
import { CandlestickData, SingleValueData } from "@/app/actions"

export default function Charts({
  chartRef,
  candlestickData,
  volumeData,
}: {
  chartRef: RefObject<HTMLDivElement | null>
  candlestickData: CandlestickData[]
  volumeData: SingleValueData[]
}) {
  const timeFormatter = (days: number) => {
    const format = (n: number) => String(n).padStart(2, "0")
    const year = Math.floor((days - 1) / 372) + 1
    const dayOfYear = ((days - 1) % 372) + 1
    const month = Math.floor((dayOfYear) / 31) + 1
    const day = ((dayOfYear) % 31) + 1
    return `${format(day)}/${format(month)}/${year}`
  }

  const chartOptions = {
    localization: {
      timeFormatter: timeFormatter,
    },
    layout: {
      background: {
        color: "transparent",
      },
      textColor: "#ffffff",
      panes: {
        enableResize: false,
      },
    },
    grid: {
      vertLines: { color: "#1f1f1f" },
      horzLines: { color: "#1f1f1f" },
    },
  }

  return (
    <div className="h-[calc(80dvh-4rem)]">
      <Chart
        containerProps={{ style: { width: "100%", height: "100%" } }}
        options={chartOptions}
        ref={chartRef}
      >
        <Pane>
          <CandlestickSeries
            data={candlestickData}
            reactive={true}
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
            data={volumeData}
          />
          <PriceScale
            id="right"
            options={{ scaleMargins: { top: 0.0125, bottom: 0.15 } }}
          />
          <PriceScale
            id="volume"
            options={{ scaleMargins: { top: 0.9, bottom: 0 } }}
          />
        </Pane>
        <Pane stretchFactor={0.4}>
          <AreaSeries
            data={[]}
            options={{
              lineColor: "cornflowerblue",
              lineWidth: 2,
              topColor: "cornflowerblue",
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
        <TimeScale
          options={{
            tickMarkFormatter: timeFormatter,
          }}
        />
      </Chart>
    </div>
  )
}
