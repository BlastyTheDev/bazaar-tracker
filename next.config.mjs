/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/refs/heads/master/data/1.21.8/items/**"
      ),
    ],
  },
}

export default nextConfig
