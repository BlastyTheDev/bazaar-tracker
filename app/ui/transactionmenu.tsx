"use client"

import Form from "next/form"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MAX_QTY } from "@/lib/bazaar"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemGroup } from "@/components/ui/item"

export default function TransactionMenu() {
  const [buyOrderType, setBuyOrderType] = useState("instabuy")
  const [sellOrderType, setSellOrderType] = useState("instasell")

  return (
    <ScrollArea className="col-span-1 rounded-sm bg-neutral-900">
      <Tabs defaultValue="buy">
        <TabsList variant={"line"} className="w-full">
          <TabsTrigger value="buy">Buy</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
        <TabsContent value="buy">
          <Form className="p-4" action={async () => {}}>
            <FieldGroup>
              <FieldLegend>Buying Item Name</FieldLegend>
              <FieldSet>
                <FieldLegend variant="label">Order Type</FieldLegend>
                <RadioGroup
                  value={buyOrderType}
                  onValueChange={setBuyOrderType}
                >
                  <FieldLabel htmlFor="instabuy">
                    <Field orientation={"horizontal"}>
                      <FieldContent>
                        <FieldTitle>Instantly Buy</FieldTitle>
                        <FieldDescription>
                          Buy now from lowest Sell Offer
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="instabuy" id="instabuy" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="buyorder">
                    <Field orientation={"horizontal"}>
                      <FieldContent>
                        <FieldTitle>Buy Order</FieldTitle>
                        <FieldDescription>
                          Place an order at your own price
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="buyorder" id="buyorder" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="unitprice">Unit Price</FieldLabel>
                    <Input
                      id="unitprice"
                      type="number"
                      min={0.1}
                      disabled={buyOrderType === "instabuy"}
                    />
                    <FieldDescription>
                      Set how much to pay for each unit
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                    <Input
                      id="quantity"
                      type="number"
                      min={1}
                      max={MAX_QTY}
                      defaultValue={1}
                    />
                    <FieldDescription>
                      Set the number of units to buy
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <ItemGroup className="gap-0">
                <Item size={"sm"}>
                  <ItemContent className="">Subtotal</ItemContent>
                  <ItemContent>123</ItemContent>
                </Item>
                <Item size={"sm"}>
                  <ItemContent className="">Bazaar Tax</ItemContent>
                  <ItemContent>123</ItemContent>
                </Item>
                <Item size={"sm"} variant={"muted"}>
                  <ItemContent className="">Estimated Total</ItemContent>
                  <ItemContent>123</ItemContent>
                </Item>
              </ItemGroup>
              <Field>
                <Button type="submit">
                  {buyOrderType === "instabuy" ? "Buy Now" : "Place Buy Order"}
                </Button>
              </Field>
            </FieldGroup>
          </Form>
        </TabsContent>
        <TabsContent value="sell">
          <Form className="p-4" action={async () => {}}>
            <FieldGroup>
              <FieldLegend>Selling Item Name</FieldLegend>
              <FieldSet>
                <FieldLegend variant="label">Order Type</FieldLegend>
                <RadioGroup
                  value={sellOrderType}
                  onValueChange={setSellOrderType}
                >
                  <FieldLabel htmlFor="instasell">
                    <Field orientation={"horizontal"}>
                      <FieldContent>
                        <FieldTitle>Instantly Sell</FieldTitle>
                        <FieldDescription>
                          Sell now to highest Buy Order
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="instasell" id="instasell" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="selloffer">
                    <Field orientation={"horizontal"}>
                      <FieldContent>
                        <FieldTitle>Sell Offer</FieldTitle>
                        <FieldDescription>
                          Put up an offer at your own price
                        </FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="selloffer" id="selloffer" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="sell-unitprice">Unit Price</FieldLabel>
                    <Input
                      id="sell-unitprice"
                      type="number"
                      min={0.1}
                      disabled={sellOrderType === "instasell"}
                    />
                    <FieldDescription>
                      Set how much to sell each unit for
                    </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="sell-quantity">Quantity</FieldLabel>
                    <Input
                      id="sell-quantity"
                      type="number"
                      min={1}
                      max={MAX_QTY}
                      defaultValue={1}
                    />
                    <FieldDescription>
                      Set the number of units to sell
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <ItemGroup className="gap-0">
                <Item size={"sm"}>
                  <ItemContent className="">Subtotal</ItemContent>
                  <ItemContent>123</ItemContent>
                </Item>
                <Item size={"sm"}>
                  <ItemContent className="">Bazaar Tax</ItemContent>
                  <ItemContent>123</ItemContent>
                </Item>
                <Item size={"sm"} variant={"muted"}>
                  <ItemContent className="">Estimated Total</ItemContent>
                  <ItemContent>123</ItemContent>
                </Item>
              </ItemGroup>
              <Field>
                <Button type="submit">
                  {sellOrderType === "instasell"
                    ? "Sell Now"
                    : "Create Sell Offer"}
                </Button>
              </Field>
            </FieldGroup>
          </Form>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  )
}
