const itemsApi = "https://api.hypixel.net/v2/resources/skyblock/items"

interface SkyBlockItem {
  material: string
  skin: {
    value: string
    signature: string
  }
  color: string
  name: string
  category: string
  tier: string
  npc_sell_price: number
  id: string
}

interface Items {
  success: boolean
  lastUpdated: number
  items: SkyBlockItem[]
}

export async function fetchItemsData() {
  try {
    const response = await fetch(itemsApi)

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`)
    }

    const data: Items = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch Bazaar data:", error)
  }
}
