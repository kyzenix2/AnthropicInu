# Anthropic Inu ($AI)

Static site for **Anthropic Inu ($AI)**, a community meme token on Ethereum.
Open `index.html` or serve the folder: `python3 -m http.server 8080`

## Config
Edit the block at the top of `js/main.js`:

- `TOKEN_NAME`, `TICKER`, `CHAIN`
- `CONTRACT_ADDRESS` — set to 0x446f33a65b0c1ed85167d1ca6749c35008a7a3c3. Leave empty to show "Coming soon". When set, every CA box updates and a Dexscreener chart button appears.
- `BUY_URL` — leave empty. When a CA is set, Buy links become `https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=<CA>`.
- `X_URL` — https://x.com/AnthropicEthInu
- `TELEGRAM_URL` — leave empty for a dimmed "Coming soon" button.

Do not use any Solana-looking address from social bios.

## Brand assets
- `assets/logo.png` — 1024x1024 coin badge (transparent outside the circle)
- `assets/logo-500.png` — 500x500
- `assets/og.jpg` — 1200x630
- `assets/banner-x.png` — 1500x500 X header (bottom-left kept clear for the profile photo)

## Sources
- Origin post and official art: https://x.com/InuAnthropic/status/2123425347366457709
- IPO-day figures (quoted as reported on X, about the $ANT stock perp, not $AI): https://x.com/Jeremybtc/status/2123421717100122172

## Disclaimer
$AI is an independent community meme token. It is not affiliated with, endorsed by, or connected to Anthropic PBC or its products. Meme coin, no financial value promised.
