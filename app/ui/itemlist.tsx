"use client"

import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { ReactElement, useEffect, useRef, useState } from "react"
import { fetchBazaarData } from "@/lib/bazaar"
import BazaarItem from "@/app/ui/bazaaritem"
import { fetchItemsData } from "@/lib/skyblockitems"

export default function ItemList() {
  const itemGroupRef = useRef(null)
  const [items, setItems] = useState<ReactElement[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const fillItemsList = async () => {
      const data = await fetchBazaarData()
      const products = Object.values(data?.products ?? {})

      const itemsData = await fetchItemsData()
      const items = Object.values(itemsData?.items ?? {})

      const newItems = products.map((product) => (
        <BazaarItem
          key={product.product_id}
          itemId={product.product_id}
          details={(() => {
            const item = items.find((i) => i.id === product.product_id)

            if (item) {
              return [item.name, item.material.toLowerCase() || ""]
            }

            return [
              product.product_id
                .replaceAll("_", " ")
                .replace("ENCHANTMENT ", "")
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              "",
            ]
          })()}
          enchantedBook={product.product_id.includes("ENCHANTMENT")}
          sellPrice={product.quick_status.sellPrice}
        />
      ))

      setItems(newItems)
    }

    fillItemsList()
  }, [])

  return (
    <div className="col-span-1 flex h-[calc(100vh-3.85rem)] flex-col overflow-hidden">
      <InputGroup className="mb-2">
        <InputGroupInput
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <ScrollArea className="flex-1 overflow-auto rounded-sm bg-neutral-900">
        <ItemGroup ref={itemGroupRef} className="gap-2">
          {items.filter((item) => {
            const name = item.key
            name!
              .replaceAll("_", " ")
              .replace("ENCHANTMENT ", "")
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
            return name?.toLowerCase().includes(query.toLowerCase().replaceAll(" ", "_"))
          })}
        </ItemGroup>
      </ScrollArea>
    </div>
  )
}
