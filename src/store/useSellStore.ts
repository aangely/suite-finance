import Fuse from "fuse.js";
import create from "zustand";

import { getTokenIcon } from "@app/utils/getTokenIcon";

export type Token = {
  name: string;
  symbol: string;
  slug: string;
  icon: string;
  balance: number;
};

export const tokenList: Token[] = [
  {
    name: "bitcoin",
    symbol: "BTC",
    slug: "bitcoin",
    icon: getTokenIcon("bitcoin"),
    balance: 100,
  },
  {
    name: "ethereum",
    symbol: "ETH",
    slug: "ethereum",
    icon: getTokenIcon("ethereum"),
    balance: 200,
  },
  {
    name: "cronos",
    symbol: "CRO",
    slug: "crypto-com-coin",
    icon: getTokenIcon("crypto-com-coin"),
    balance: 300000,
  },
  {
    name: "solana",
    symbol: "SOL",
    slug: "solana",
    icon: getTokenIcon("solana"),
    balance: 2000,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    slug: "usd-coin",
    icon: getTokenIcon("usd-coin"),
    balance: 1000,
  },
  {
    name: "Tether",
    symbol: "USDT",
    slug: "tether",
    icon: getTokenIcon("tether"),
    balance: 2000,
  },
  { name: "Shiba Inu", symbol: "SHIB", slug: "shiba-inu", icon: getTokenIcon("shiba-inu"), balance: 3000 },
  {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    slug: "wrapped-bitcoin",
    icon: getTokenIcon("wrapped-bitcoin"),
    balance: 4000,
  },
  {
    name: "VVS Finance",
    symbol: "VVS",
    slug: "vvs-finance",
    icon: getTokenIcon("vvs-finance"),
    balance: 100000,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    slug: "dogecoin",
    icon: getTokenIcon("dogecoin"),
    balance: 320000,
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    slug: "cosmos",
    icon: getTokenIcon("cosmos"),
    balance: 1000000,
  },
  {
    name: "Minted",
    symbol: "MTD",
    slug: "minted",
    icon: getTokenIcon("minted"),
    balance: 200000,
  },
];

const fuseOptions: Fuse.IFuseOptions<Token> = {
  threshold: 0.2,
  // includeScore: true,
  keys: ["name", "symbol"],
};

export const tokenListSearch = new Fuse(tokenList, fuseOptions);

export const useSellStore = create<{ setToken: (token: Token) => void; token: Token; balance: number; setBalance: (b: number) => void }>(
  (set) => ({
    token: tokenList[0],
    balance: 0,
    setBalance: (b) => set({ balance: b }),
    setToken: (token) => set({ token, balance: 0 }),
  }),
);
