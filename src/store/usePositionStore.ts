import create from "zustand";

import type { PurchaseTime } from "./usePurchaseStore";
import type { Token } from "./useSellStore";

export type Position = {
  id: number;
  token: Token;
  tokens: Token[];
  time: PurchaseTime;
  startTime: string;
};

export const usePositionStore = create<{ positions: Position[]; addPosition: (p: Position) => void }>((set, get) => ({
  positions: [],
  addPosition: (p) => set({ positions: [...get().positions, p] }),
}));
