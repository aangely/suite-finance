import dayjs from "dayjs";
import create from "zustand";

import { tokenList } from "./useSellStore";

import type { PurchaseTime } from "./usePurchaseStore";
import type { Token } from "./useSellStore";

export type TargetToken = Token & { percent: number };

export type Position = {
  id: number;
  token: Token;
  total: number;
  tokens: TargetToken[];
  time: PurchaseTime;
  totalTime: number;
  startTime: string;
  endTime: string;
  status: "started" | "pending" | "finished";
  rate: number;
};

export const usePositionStore = create<{
  position: Position | null;
  pendingPositions: Position[];
  startedPositions: Position[];
  finishedPositions: Position[];
  setPosition: (p: Position) => void;
  addPosition: (p: Position) => void;
}>((set, get) => ({
  position: null,
  pendingPositions: [
    {
      id: 0,
      token: {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        slug: "wrapped-bitcoin",
        icon: "https://static.crypto.com/token/icons/wrapped-bitcoin/color_icon.png",
        balance: 4000,
      },
      total: 2000,
      tokens: [
        {
          name: "cronos",
          symbol: "CRO",
          slug: "crypto-com-coin",
          icon: "https://static.crypto.com/token/icons/crypto-com-coin/color_icon.png",
          balance: 300000,
          percent: 20,
        },
        {
          name: "USD Coin",
          symbol: "USDC",
          slug: "usd-coin",
          icon: "https://static.crypto.com/token/icons/usd-coin/color_icon.png",
          balance: 1000,
          percent: 30,
        },
        {
          name: "VVS Finance",
          symbol: "VVS",
          slug: "vvs-finance",
          icon: "https://static.crypto.com/token/icons/vvs-finance/color_icon.png",
          balance: 100000,
          percent: 50,
        },
      ],
      time: "weekly",
      startTime: "Tue Oct 18 2022",
      endTime: "Tue Nov 22 2022",
      totalTime: 5,
      status: "pending",
      rate: 400,
    },
  ],
  startedPositions: [
    {
      id: 5,
      token: tokenList[0],
      tokens: tokenList.slice(2, 6).map((token) => ({ ...token, percent: 25 })),
      total: 10,
      totalTime: 8,
      time: "weekly",
      startTime: dayjs().add(-2, "week").toDate().toDateString(),
      endTime: dayjs().add(5, "week").toDate().toDateString(),
      status: "started",
      rate: 10 / 8,
    },
  ],
  finishedPositions: [
    {
      id: 2,
      token: tokenList[1],
      tokens: tokenList.slice(2, 6).map((token) => ({ ...token, percent: 25 })),
      total: 110,
      totalTime: 6,
      time: "weekly",
      startTime: dayjs().add(-8, "week").toDate().toDateString(),
      endTime: dayjs().add(-2, "week").toDate().toDateString(),
      status: "finished",
      rate: 110 / 6,
    },
  ],
  setPosition: (p) => set({ position: p }),
  addPosition: (p) => set({ pendingPositions: [...get().pendingPositions, p] }),
}));
