import type { Theme, ThemeName } from "./types";
import { minimal } from "./presets/minimal";
import { mono } from "./presets/mono";
import { neon } from "./presets/neon";
import { pastel } from "./presets/pastel";
import { sunset } from "./presets/sunset";
import { midnight } from "./presets/midnight";
import { glass } from "./presets/glass";
import { retro } from "./presets/retro";

export const THEMES: Record<ThemeName, Theme> = {
  minimal,
  mono,
  neon,
  pastel,
  sunset,
  midnight,
  glass,
  retro,
};

export const DEFAULT_THEME: ThemeName = "minimal";

export function getTheme(name: string): Theme {
  if (name in THEMES) {
    return THEMES[name as ThemeName];
  }
  return THEMES[DEFAULT_THEME];
}

export type { Theme, ThemeName, ThemeTokens, Pattern } from "./types";
