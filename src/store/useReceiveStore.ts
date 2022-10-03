import create from "zustand";

import type { Token as _Token } from "./useSellStore";

type Token = _Token & { percent: number };

export const useReceiveStore = create<{
  total: number;
  tokens: Token[];
  clear: () => void;
  addToken: (token: Token) => void;
  removeToken: (token: Token) => void;
  setPercent: (token: Token, percent: number) => void;
}>((set, get) => ({
  total: 0,
  tokens: [],
  clear: () => set({ total: 0, tokens: [] }),
  addToken: (token) => {
    const prevState = get();
    const exist = prevState.tokens;
    set({ tokens: [...exist, { ...token, percent: 0 }] });
  },
  setPercent: (token, percent) => {
    const prevState = get();
    const exist = prevState.tokens;
    const newTokens = exist.map((_token) => (_token.name === token.name ? { ..._token, percent } : _token));
    const total = newTokens.reduce((p, c) => p + c.percent, 0);
    set({ tokens: newTokens, total });
  },
  removeToken: (token) => {
    const prevState = get();
    const exist = prevState.tokens;
    const newTokens = exist.filter((_token) => _token.name !== token.name);
    const total = newTokens.length ? newTokens.reduce((p, c) => p + c.percent, 0) : 0;
    set({ tokens: newTokens, total });
  },
}));
