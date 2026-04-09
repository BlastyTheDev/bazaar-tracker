import "dotenv/config"
import { createServer } from "http"
import next from "next"
import { fetchBazaarData } from "@/lib/bazaar"
import { db } from "@/db/db"
import { pricesTable } from "@/db/schema"

const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res)
  }).listen(port)

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }`
  )

  recordBazaar()
})

async function recordBazaar() {
  console.log("Started fetching Bazaar data")

  setInterval(async () => {
    const data = await fetchBazaarData()
    const time = BigInt(data?.lastUpdated || Date.now())
    console.log(`Saving ${time} Bazaar data to database.`)
    const prices: (typeof pricesTable.$inferInsert)[] = []
    Object.values(data?.products || {}).forEach(async (product) => {
      const price: typeof pricesTable.$inferInsert = {
        itemId: product.product_id,
        time: time,
        sell: BigInt(Math.round(product.quick_status.sellPrice * 10)),
        supply: product.quick_status.sellVolume,
        sell_vol: product.quick_status.sellMovingWeek,
        offers: product.quick_status.sellOrders,
        buy: BigInt(Math.round(product.quick_status.buyPrice * 10)),
        demand: product.quick_status.buyVolume,
        buy_vol: product.quick_status.buyMovingWeek,
        orders: product.quick_status.buyOrders,
      }
      prices.push(price)
    })
    await db.insert(pricesTable).values(prices)
  }, 20 * 1000)
}
