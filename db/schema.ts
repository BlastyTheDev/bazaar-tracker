import { bigint, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core"

export const itemsTable = pgTable("items", {
  id: text().primaryKey(),
  name: text().notNull(),
  category: text(),
})

export const pricesTable = pgTable(
  "prices",
  {
    itemId: text("item_id")
      .notNull()
      .references(() => itemsTable.id, { onDelete: "cascade" }),
    time: bigint({ mode: "bigint" }).notNull(),
    sell: bigint({ mode: "bigint" }).notNull(), // 1.1 coins = 11 in db
    supply: integer().notNull(),
    sell_vol: integer().notNull(),
    offers: integer().notNull(),
    buy: bigint({ mode: "bigint" }).notNull(), // 1.1 coins = 11 in db
    demand: integer().notNull(),
    buy_vol: integer().notNull(),
    orders: integer().notNull(),
  },
  (table) => [primaryKey({ columns: [table.itemId, table.time] })]
)
