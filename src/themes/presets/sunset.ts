import type { Theme } from "../types";

export const sunset: Theme = {
  name: "sunset",
  label: "Sunset",
  tokens: {
    bg: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #ff99ac 100%)",
    fg: "#ffffff",
    muted: "rgba(255,255,255,0.75)",
    accent: "#fff3e0",
    border: "none",
    shadow: "0 4px 12px rgba(255,106,136,0.3)",
    radius: 16,
    pattern: "none",
  },
};
