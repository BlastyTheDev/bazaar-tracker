# bazaar-tracker
A web interface for the Hypixel SkyBlock Bazaar.

## Features:
- Saving Bazaar data to Supabase database
- Render Candlestick chart and Histogram chart for prices and volume
- Live updates (every 20 seconds)

## Planned Features:
- Transaction panel to integrate with the game through a Minecraft mod

## Setup
To set up bazaar-tracker for yourself, you need:
- [System Requirements for NextJS](https://nextjs.org/docs/app/getting-started/installation#system-requirements)
- Supabase project and connection string (e.g. `postgresql://postgres:[YOUR-PASSWORD]@db.projectid.supabase.co:5432/postgres` or `postgresql://postgres.projectid:[YOUR-PASSWORD]@aws-1-region.pooler.supabase.com:5432/postgres` for IPv4 only networks)

You do **NOT** need:
- Hypixel API key

1. Clone the repository and run `npm i`
2. Rename `.env.example` to `.env` and set the `DATABASE_URL` variable to your Supabase connection string
3. Run `npm run build` then `npm run start`
4. Access the web app at `http://localhost:3000`

> [!WARNING]
> I didn't test these instructions so you'll have to figure it out if it goes wrong. Sorry.
