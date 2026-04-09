"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import TransactionMenu from "@/app/ui/transactionmenu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Charts from "@/app/ui/charts"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import clsx from "clsx"
import { notFound, useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  CandlestickData,
  fetchCandlestickDaysHistory,
  fetchItem,
  fetchLatestPrice,
  SingleValueData,
} from "@/app/actions"
import { itemsTable, pricesTable } from "@/db/schema"

export default function Page() {
  const params = useParams<{ itemId: string }>()
  const itemId = params.itemId

  const [item, setItem] = useState<typeof itemsTable.$inferSelect>()
  const [price, setPrice] = useState<typeof pricesTable.$inferSelect>()
  const [candlesticks, setCandlesticks] = useState<CandlestickData[]>()
  const [volume, setVolume] = useState<SingleValueData[]>()

  const priceFormatter = new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  const signFormatter = new Intl.NumberFormat("en-AU", {
    signDisplay: "always",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })

  function format(price: number) {
    return priceFormatter.format(price)
  }

  function formatWithSign(number: number) {
    return signFormatter.format(number)
  }

  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPrices = async () => {
      const data = await fetchCandlestickDaysHistory(itemId)
      if (!data) {
        notFound()
      }
      setCandlesticks(data.candlestickData)
      setVolume(data.volumeData)
      const price = await fetchLatestPrice(itemId)
      if (!price) {
        notFound()
      }
      setPrice(price)
    }

    const fetchData = async () => {
      const item = await fetchItem(itemId)
      if (!item) {
        notFound()
      }
      setItem(item)

      fetchPrices()
    }
    fetchData()

    const interval = setInterval(async () => {
      await fetchPrices()
    }, 20 * 1000)

    return () => clearInterval(interval)
  }, [itemId])

  return (
    <>
      <div className="col-span-3 grid grid-rows-6 gap-2">
        <div className="row-span-1 rounded-sm bg-neutral-900 p-2">
          <div className="grid grid-cols-2">
            <Breadcrumb className="mb-3">
              <BreadcrumbList>
                <BreadcrumbItem>
                  {clsx(
                    (item?.category &&
                      item.category
                        .replaceAll("_", " ")
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")) ||
                      "All"
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{item?.name || "Loading..."}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <span className={`text-right`}>{"0.0"} net worth</span>
          </div>
          <div className="my-auto grid grid-cols-2">
            <span className={`text-6xl`}>
              {clsx(
                (price?.sell && format(Number(price.sell) / 10)) ||
                  "Loading..."
              )}
            </span>
            <span className={`text-right text-6xl`}>{0} owned</span>
          </div>
          <ItemGroup className="mt-2 grid grid-cols-5 align-bottom">
            <Item className="py-0 pl-0">
              <ItemContent>
                <ItemDescription>
                  {clsx(
                    (candlesticks &&
                      formatWithSign(
                        candlesticks[candlesticks.length - 1].close -
                          candlesticks[candlesticks.length - 1].open
                      )) ||
                      ""
                  )}
                </ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  {clsx(
                    (candlesticks &&
                      price &&
                      `${formatWithSign(
                        (100 *
                          (Number(price.sell) / 10 -
                            candlesticks[candlesticks.length - 1].open)) /
                          candlesticks[candlesticks.length - 1].open
                      )}%`) ||
                      ""
                  )}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>Open</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  {clsx(
                    (candlesticks &&
                      format(candlesticks[candlesticks.length - 1].open)) ||
                      "-"
                  )}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>High</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  {clsx(
                    (candlesticks &&
                      format(candlesticks[candlesticks.length - 1].high)) ||
                      "-"
                  )}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>Low</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  {clsx(
                    (candlesticks &&
                      format(candlesticks[candlesticks.length - 1].low)) ||
                      "-"
                  )}
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>Close</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  {clsx(
                    (candlesticks &&
                      format(candlesticks[candlesticks.length - 1].close)) ||
                      "-"
                  )}
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
        <ScrollArea className="row-span-5 rounded-sm bg-neutral-900">
          <Tabs defaultValue="chart">
            <TabsList variant={"line"}>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <Charts
                chartRef={chartRef}
                candlestickData={candlesticks || []}
                volumeData={volume || []}
              />
            </TabsContent>
            <TabsContent value="orders"></TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
      <TransactionMenu />
    </>
  )
}
