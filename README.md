# Pollar Neobank Template

A **batteries-included consumer banking app** on [Pollar](https://pollar.xyz) / Stellar: log in, see your account home (balance, address + QR to receive, assets), **send a payment**, and browse your **transaction history**. It's the full counterpart to `pollar-wallet-template` — the complete app you can actually ship from.

Everything is composed from what the SDK already provides — nothing wallet-related is reimplemented.

```
src/
├── app/
│   ├── layout.tsx / providers.tsx   PollarProvider (client = { apiKey }) + header
│   ├── page.tsx                     account home (logged-out gate → AccountHome)
│   ├── send/page.tsx                send flow
│   └── history/page.tsx             transaction history
├── components/
│   ├── AccountHome.tsx              balance + address/QR + assets, composed from the SDK
│   ├── SendForm.tsx                 destination/amount/asset/memo → runTx('payment', …)
│   ├── HistoryList.tsx              txHistory state + paginated fetchTxHistory
│   └── AppHeader.tsx                WalletButton
└── lib/config.ts                    publishable key + explorer link
```

## What it does

- **Login** — `WalletButton` from `@pollar/react`.
- **Account home** — balance + spendable (`available`) from `getClient().getWalletBalance(address)`, the receive address with a QR (`qrcode.react`) plus the native receive modal (`openReceiveModal`), and the asset/trustline list.
- **Send** — a form (destination, amount, asset, optional memo) that submits with `usePollar().runTx('payment', { destination, asset, amount, memo })`. Pollar's transaction modal opens automatically for review; the result (success / pending / error) is reflected inline with a tx link.
- **History** — reads `usePollar().txHistory` and pages with `getClient().fetchTxHistory({ limit, offset })`. Offset-based `Load more`. Shows operation, summary, status, and date.
- **States** — logged out / in, loading, empty, and error are all handled.

## Run

**Requirements:** Node ≥ 20, a Pollar publishable key.

1. Get a key (public by design, `pub_testnet_...`) at [dashboard.pollar.xyz](https://dashboard.pollar.xyz).
2. Configure:

   ```bash
   cp .env.example .env.local
   # NEXT_PUBLIC_POLLAR_PUBLISHABLE_KEY=pub_testnet_xxx
   ```

3. Install & run:

   ```bash
   pnpm install
   pnpm dev
   ```

4. Open <http://localhost:3000> → log in → account home → send (XLM works with no trustline on testnet — fund via [friendbot](https://friendbot.stellar.org)) → history.

## Tech

Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind 4 · `@pollar/core@^0.9.0` · `@pollar/react@^0.9.0` · `qrcode.react`. No backend, no secret key — custodial signing happens server-side inside Pollar; this app only calls the SDK.

## Demo

A short testnet walkthrough (login → receive → send → history) with a real Pollar login is linked in the PR.
