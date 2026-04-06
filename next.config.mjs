/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/BlastyTheDev/minecraft-assets/refs/heads/main/1.21.8_blocks_items/**"
      ),
    ],
  },
}

export default nextConfig
