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
    <div className="flex flex-col fixed h-screen top-0 py-2 w-96 overflow-hidden">
      <InputGroup className="mb-2 shrink-0">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align={"inline-end"}></InputGroupAddon>
      </InputGroup>
      <ScrollArea className="flex-1 min-h-0">
        <ItemGroup className="gap-2">
        </ItemGroup>
      </ScrollArea>
    </div>
  )
}
