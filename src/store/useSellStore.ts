import create from "zustand";

import { getTokenIcon } from "@app/utils/getTokenIcon";

export type Token = {
  name: string;
  symbol: string;
  icon: string;
};

export const sellTokenList: Token[] = [
  {
    name: "bitcoin",
    symbol: "BTC",
    icon: getTokenIcon("bitcoin"),
  },
  {
    name: "ethereum",
    symbol: "ETH",
    icon: getTokenIcon("ethereum"),
  },
  {
    name: "cronos",
    symbol: "CRO",
    icon: getTokenIcon("cronos"),
  },
  {
    name: "solana",
    symbol: "SOL",
    icon: getTokenIcon("solana"),
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    icon: getTokenIcon("usd-coin"),
  },
];

export const useSellStore = create<{ set: (token: Token) => void; token: Token }>(() => ({
  token: sellTokenList[0],
  set: (token) => ({ token }),
}));
