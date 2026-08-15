import { create } from "zustand";

export type EchoView = "landing" | "entering" | "world";

interface EchoState {
  view: EchoView;
  enterWorld: () => void;
  completeEntry: () => void;
  returnToLanding: () => void;
}

export const useEchoStore = create<EchoState>((set) => ({
  view: "landing",

  enterWorld: () => {
    set({ view: "entering" });
  },

  completeEntry: () => {
    set({ view: "world" });
  },

  returnToLanding: () => {
    set({ view: "landing" });
  },
}));