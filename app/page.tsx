import ItemList from "@/app/ui/itemlist"
import { ScrollArea } from "@/components/ui/scroll-area"
import TransactionMenu from "@/app/ui/transactionmenu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Charts from "@/app/ui/charts"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item"

export default function Page() {
  return (
    <div className="mx-2 mt-4 mb-2 grid h-full grid-cols-5 gap-2">
      <ItemList />
      <div className="col-span-3 grid grid-rows-6 gap-2">
        <div className="row-span-1 rounded-sm bg-neutral-900 p-2">
          <div className="grid grid-cols-2">
            <Breadcrumb className="mb-3">
              <BreadcrumbList>
                <BreadcrumbItem>Category</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Item Name</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <span className={`text-right`}>{"12,345,678,901.2"} net worth</span>
          </div>
          <div className="my-auto grid grid-cols-2">
            <span className={`text-6xl`}>12,345,678,901.2</span>
            <span className={`text-right text-6xl`}>{0} owned</span>
          </div>
          <ItemGroup className="mt-2 grid grid-cols-5 align-bottom">
            <Item className="py-0 pl-0">
              <ItemContent>
                <ItemDescription>+12,345,678,901.2</ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemDescription>+1.02%</ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>Open</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>12,345,678,901.2</ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>High</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>12,345,678,901.2</ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>Low</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>12,345,678,901.2</ItemDescription>
              </ItemContent>
            </Item>
            <Item className="py-0">
              <ItemContent>
                <ItemTitle>Close</ItemTitle>
              </ItemContent>
              <ItemContent>
                <ItemDescription>12,345,678,901.2</ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>
        </div>
        <ScrollArea className="row-span-5 rounded-sm bg-neutral-900">
          <Tabs defaultValue="chart">
            <TabsList variant={"line"}>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <Charts />
            </TabsContent>
            <TabsContent value="orders"></TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
      <TransactionMenu />
    </div>
  )
}
