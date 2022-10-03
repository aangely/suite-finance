import create from "zustand";

export type PurchaseTime = "daily" | "weekly" | "monthly";

export const usePurchaseStore = create<{
  time: PurchaseTime;
  total: number;
  startTime: string;
  clear: () => void;
  setTotal: (t: number) => void;
  setStartTime: (s: string) => void;
  setTime: (time: PurchaseTime) => void;
}>((set) => ({
  time: "daily",
  total: 0,
  startTime: new Date().toDateString(),
  clear: () => set({ time: "daily", total: 0, startTime: new Date().toDateString() }),
  setTotal: (t) => set({ total: t }),
  setStartTime: (s) => set({ startTime: s }),
  setTime: (time) => set({ time, total: 0, startTime: new Date().toDateString() }),
}));
