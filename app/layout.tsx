import { Geist, Geist_Mono } from "next/font/google"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/app/ui/navbar"
import ItemList from "@/app/ui/itemlist"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <div className="mx-2 mt-4 mb-2 grid h-full grid-cols-5 gap-2">
            <ItemList />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
