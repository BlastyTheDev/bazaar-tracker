import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import Image from "next/image"
import Link from "next/link"

export default function BazaarItem({
  itemId,
  sellPrice,
}: {
  itemId: string
  sellPrice: number
}) {
  return (
    <Item variant={"outline"} asChild>
      <Link href={"/"}>
        <ItemMedia variant={"image"}>
          <Image
            src={
              "https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/refs/heads/master/data/1.21.8/items/wheat.png"
            }
            alt=""
            width={16}
            height={16}
            className="pixelated enchanted-item object-cover"
          />
          <div className=""></div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{itemId}</ItemTitle>
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
