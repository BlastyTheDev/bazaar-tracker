import "dotenv/config"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { fetchBazaarData } from "./lib/bazaar"
import { itemsTable } from "./db/schema"
import { fetchItemsData } from "./lib/skyblockitems"

const client = postgres(process.env.DATABASE_URL!)
const db = drizzle({ client })

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
          .replaceAll("_", "")
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
