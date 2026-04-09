import "dotenv/config"
import { fetchBazaarData } from "./lib/bazaar"
import { itemsTable, pricesTable } from "./db/schema"
import { fetchItemsData } from "./lib/skyblockitems"
import { db } from "./db/db"

async function seedItemsTable() {
  const bazaarData = await fetchBazaarData()
  const itemsData = await fetchItemsData()
  console.log("Got SkyBlock Data.")

  Object.values(bazaarData?.products ?? {}).forEach(async (product) => {
    console.log(`Processing product ${product.product_id}`)
    const sbItem = itemsData?.items.find((i) => i.id === product.product_id)
    const name = sbItem
      ? sbItem.name
      : product.product_id
          .replaceAll("_", " ")
          .replace("ENCHANTMENT ", "")
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
    const category = sbItem ? sbItem.category : null

    const item: typeof itemsTable.$inferInsert = {
      id: product.product_id,
      name: name,
      category: category,
    }
    console.log(
      `Inserting ${product.product_id} as {${item.id}, ${item.name}, ${item.category}}.`
    )
    await db.insert(itemsTable).values(item)
  })
  console.log("Success!")
}

async function tes() {
  const a: typeof pricesTable.$inferInsert = {
    itemId: "BOOSTER_COOKIE",
    time: BigInt(6969696969),
    sell: BigInt(10),
    supply: 1,
    sell_vol: 1,
    offers: 1,
    buy: BigInt(9218398),
    demand: 1,
    buy_vol: 1,
    orders: 1,
  }
  await db.insert(pricesTable).values(a)
}

tes()
