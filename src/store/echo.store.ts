import { create } from "zustand";

export type EchoView =
  | "landing"
  | "entering"
  | "world"
  | "node";

export type WorldNodeType =
  | "memory"
  | "projects"
  | "decisions"
  | "possibilities";

interface EchoState {
  view: EchoView;

  activeNode: WorldNodeType | null;

  selectedNode: WorldNodeType | null;

  enterWorld: () => void;

  completeEntry: () => void;

  setActiveNode: (
    node: WorldNodeType | null,
  ) => void;

  selectNode: (
    node: WorldNodeType,
  ) => void;

  closeNode: () => void;

  returnToLanding: () => void;
}

export const useEchoStore =
  create<EchoState>((set) => ({
    view: "landing",

    activeNode: null,

    selectedNode: null,

    enterWorld: () => {
      set({
        view: "entering",
      });
    },

    completeEntry: () => {
      set({
        view: "world",
      });
    },

    setActiveNode: (node) => {
      set({
        activeNode: node,
      });
    },

    selectNode: (node) => {
      set({
        view: "node",
        selectedNode: node,
        activeNode: node,
      });
    },

    closeNode: () => {
      set({
        view: "world",
        selectedNode: null,
        activeNode: null,
      });
    },

    returnToLanding: () => {
      set({
        view: "landing",
        activeNode: null,
        selectedNode: null,
      });
    },
  }));