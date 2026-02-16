import type { Theme } from "../types";

export const glass: Theme = {
  name: "glass",
  label: "Glass",
  tokens: {
    bg: "rgba(255,255,255,0.08)",
    fg: "#f5f5f5",
    muted: "#b0bec5",
    accent: "rgba(255,255,255,0.2)",
    border: "rgba(255,255,255,0.12)",
    shadow: "0 8px 32px rgba(0,0,0,0.2)",
    radius: 16,
    pattern: "noise",
  },
};
