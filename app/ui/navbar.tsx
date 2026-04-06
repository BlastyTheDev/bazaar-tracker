import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="sticky top-2 mx-2 mb-2 grid grid-cols-5 rounded-sm bg-neutral-900">
      <NavigationMenu className="col-span-1">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={"/"}>Trade</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ItemGroup className="col-span-4 grid grid-cols-4 gap-8">
        <Item className="py-0">
          <ItemContent>
            <ItemTitle>Bank Balance</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemDescription>1 084 274 655.72</ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-0">
          <ItemContent>
            <ItemTitle>Purse</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemDescription>249 523 588.87</ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-0">
          <ItemContent>
            <ItemTitle>Portfolio Value</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemDescription>305 877 128.23</ItemDescription>
          </ItemContent>
        </Item>
        <Item className="py-0">
          <ItemContent>
            <ItemTitle>Net Worth</ItemTitle>
          </ItemContent>
          <ItemContent>
            <ItemDescription>1 639 675 372.82</ItemDescription>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}
