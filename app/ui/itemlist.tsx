import { ItemGroup } from "@/components/ui/item"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export default function ItemList() {
  return (
    <div className="col-span-1 flex h-[calc(100vh-3.85rem)] flex-col overflow-hidden">
      <InputGroup className="mb-2">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <ScrollArea className="flex-1 overflow-auto rounded-sm bg-neutral-900">
        <ItemGroup className="gap-2"></ItemGroup>
      </ScrollArea>
    </div>
  )
}
