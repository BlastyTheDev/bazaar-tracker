export const MAX_QTY = 71680

const bazaarApi = "https://api.hypixel.net/v2/skyblock/bazaar"

interface Order {
  amount: number
  pricePerUnit: number
  orders: number
}

interface QuickStatus {
  productId: string
  sellPrice: number
  sellVolume: number
  sellMovingWeek: number
  sellOrders: number
  buyPrice: number
  buyVolume: number
  buyMovingWeek: number
  buyOrders: number
}

interface Product {
  product_id: string
  sell_summary: Order[]
  buy_summary: Order[]
  quick_status: QuickStatus
}

interface Bazaar {
  success: boolean
  lastUpdated: number
  products: Record<string, Product>
}

export async function fetchBazaarData() {
  try {
    const response = await fetch(bazaarApi)

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data: Bazaar = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch Bazaar data:", error)
  }
}
