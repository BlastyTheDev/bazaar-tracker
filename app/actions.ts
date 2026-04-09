"use server"

import { db } from "@/db/db"
import { pricesTable } from "@/db/schema"
import { and, asc, eq, gte, sql } from "drizzle-orm"

export async function fetchItem(itemId: string) {
  const item = await db.query.itemsTable.findFirst({
    where: (items, { eq }) => eq(items.id, itemId.replaceAll("%3A", ":")),
  })
  return item
}

export async function fetchLatestPrice(itemId: string) {
  const latestPrice = await db.query.pricesTable.findFirst({
    where: (prices, { eq }) => eq(prices.itemId, itemId),
    orderBy: (prices, { desc }) => [desc(prices.time)],
  })
  return latestPrice
}

export interface CandlestickData {
  time: number
  open: number
  high: number
  low: number
  close: number
}

export interface SingleValueData {
  time: number
  value: number
}

export async function fetchCandlestickDaysHistory(
  itemId: string,
  days: number = 372
) {
  const epoch = BigInt(1560275700000) // year 1, month 1, day 1 start
  const interval = BigInt(1200000) // 20 minutes = 1 skyblock day

  const now = BigInt(Date.now())
  const currentInterval = (now - epoch) / interval
  const startTime = epoch + (currentInterval - BigInt(days)) * interval

  const sq = db.$with("with_intervals").as(
    db
      .select({
        interval:
          sql<number>`floor((${pricesTable.time} - ${epoch}) / ${interval})`.as(
            "interval"
          ),
        sell: pricesTable.sell,
        time: pricesTable.time,
        buy_vol: pricesTable.buy_vol,
        sell_vol: pricesTable.sell_vol,
      })
      .from(pricesTable)
      .where(
        and(eq(pricesTable.itemId, itemId), gte(pricesTable.time, startTime))
      )
  )

  const prices = await db
    .with(sq)
    .select({
      time: sq.interval,
      open: sql<number>`(array_agg(${sq.sell} ORDER BY ${sq.time} ASC))[1]`,
      high: sql<number>`max(${sq.sell})`,
      low: sql<number>`min(${sq.sell})`,
      close: sql<number>`(array_agg(${sq.sell} ORDER BY ${sq.time} DESC))[1]`,
      volume: sql<number>`sum(${sq.buy_vol} + ${sq.sell_vol})`,
    })
    .from(sq)
    .groupBy(sq.interval)
    .orderBy(asc(sq.interval))

  const candlestickData = prices
    .map(({ time, open, high, low, close }) => ({
      time,
      open: Number(open) / 10,
      high: Number(high) / 10,
      low: Number(low) / 10,
      close: Number(close) / 10,
    }))
    .sort((a, b) => a.time - b.time)

  const volumeData = prices.map(({ time, volume }) => ({
    time,
    value: Number(volume),
  }))

  return { candlestickData, volumeData }
}
