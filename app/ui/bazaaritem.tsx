import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import Link from "next/link"
import dynamic from "next/dynamic"

const ClientImage = dynamic(() => import("@/app/ui/clientimage"), {
  ssr: false,
})

export default function BazaarItem({
  details,
  enchantedBook,
  sellPrice,
}: {
  details: string[]
  enchantedBook: boolean
  sellPrice: number
}) {
  const name = details[0]
  const material = details[1] || ""
  let image
  if (material.length > 0) {
    image = `https://raw.githubusercontent.com/BlastyTheDev/minecraft-assets/refs/heads/main/1.21.8_blocks_items/${material}.png`
  } else if (enchantedBook) {
    image =
      "https://raw.githubusercontent.com/BlastyTheDev/minecraft-assets/refs/heads/main/1.21.8_blocks_items/enchanted_book.png"
  } else {
    image = "/"
  }

  return (
    <Item variant={"outline"} asChild>
      <Link href={"/"}>
        <ItemMedia variant={"image"}>
          <ClientImage src={image} alt="" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription>{sellPrice.toFixed(2)}</ItemDescription>
        </ItemContent>
        <ItemContent>
          <ItemDescription>-1.02</ItemDescription>
          <ItemDescription>-0.0%</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  )
}
