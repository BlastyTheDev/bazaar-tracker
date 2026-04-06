import ItemList from "@/app/ui/itemlist"
import { ScrollArea } from "@/components/ui/scroll-area"
import TransactionMenu from "@/app/ui/transactionmenu"

export default function Page() {
  return (
    <div className="mx-2 mt-4 mb-2 grid h-full grid-cols-5 gap-2">
      <ItemList />
      <ScrollArea className="col-span-3">a</ScrollArea>
      <TransactionMenu />
    </div>
  )
}
