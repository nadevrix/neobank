// Public-by-design configuration. The publishable key (pub_testnet_...) is not a
// secret; custodial signing happens server-side inside Pollar.

export const POLLAR_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_POLLAR_PUBLISHABLE_KEY ?? "";

export const NETWORK =
  POLLAR_PUBLISHABLE_KEY.split("_")[1] === "mainnet" ? "mainnet" : "testnet";

export const EXPLORER_TX = (hash: string) =>
  `https://stellar.expert/explorer/${NETWORK}/tx/${hash}`;
