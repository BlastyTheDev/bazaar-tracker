"use client"

import {
  AreaSeries,
  CandlestickSeries,
  Chart,
  HistogramSeries,
  Pane,
  PriceScale,
} from "lightweight-charts-react-components"
import { histoData, initialData, rsiData } from "@/app/ui/data"

export default function Charts() {
  const chartOptions = {
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
      >
        <Pane>
          <CandlestickSeries data={initialData} />
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
      </Chart>
    </div>
  )
}
