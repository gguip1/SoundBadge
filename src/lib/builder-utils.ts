import { parseYouTubeUrl } from "./url-parser";
import { useState, useEffect } from "react";

// --- Types ---

export type StyleType = "classic" | "template";

export interface BuilderState {
  styleType: StyleType;
  styleName: string;
  urls: string[];
  layout: "compact" | "regular" | "wide";
  variant: string | undefined;
  tags: string;
  label: string;
}

export interface ClassicThemeMeta {
  type: "classic";
  name: string;
  label: string;
  tokens: {
    bg: string;
    fg: string;
    muted: string;
    accent: string;
    border: string;
    shadow: string;
    radius: number;
    pattern: string;
  };
}

export interface TemplateMeta {
  type: "template";
  name: string;
  label: string;
  description: string;
  category: string;
  supportsMultiTrack: boolean;
  supportsTags: boolean;
  supportsLabel: boolean;
  maxTracks: number;
  variants: string[];
  previewDimensions: { width: number; height: number };
}

export interface ThemesResponse {
  classic: ClassicThemeMeta[];
  templates: TemplateMeta[];
}

export interface StyleCapabilities {
  supportsLayout: boolean;
  supportsTags: boolean;
  supportsLabel: boolean;
  maxTracks: number;
  variants: string[];
  previewDimensions: { width: number; height: number };
}

// --- Reducer ---

export type BuilderAction =
  | { type: "SET_STYLE"; styleType: StyleType; styleName: string; capabilities: StyleCapabilities }
  | { type: "SET_URL"; index: number; value: string }
  | { type: "ADD_URL" }
  | { type: "REMOVE_URL"; index: number }
  | { type: "SET_LAYOUT"; layout: "compact" | "regular" | "wide" }
  | { type: "SET_VARIANT"; variant: string | undefined }
  | { type: "SET_TAGS"; tags: string }
  | { type: "SET_LABEL"; label: string };

export const initialState: BuilderState = {
  styleType: "classic",
  styleName: "minimal",
  urls: [""],
  layout: "regular",
  variant: undefined,
  tags: "",
  label: "",
};

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "SET_STYLE": {
      const next = { ...state, styleType: action.styleType, styleName: action.styleName };

      // Truncate urls if not multi-track
      if (action.capabilities.maxTracks === 1 && next.urls.length > 1) {
        next.urls = [next.urls[0]];
      }

      // Reset layout if not supported
      if (!action.capabilities.supportsLayout) {
        next.layout = "regular";
      }

      // Clear variant if not supported
      if (action.capabilities.variants.length === 0) {
        next.variant = undefined;
      } else if (next.variant && !action.capabilities.variants.includes(next.variant)) {
        next.variant = action.capabilities.variants[0];
      }

      return next;
    }

    case "SET_URL": {
      const urls = [...state.urls];
      urls[action.index] = action.value;
      return { ...state, urls };
    }

    case "ADD_URL":
      return { ...state, urls: [...state.urls, ""] };

    case "REMOVE_URL": {
      const urls = state.urls.filter((_, i) => i !== action.index);
      return { ...state, urls: urls.length === 0 ? [""] : urls };
    }

    case "SET_LAYOUT":
      return { ...state, layout: action.layout };

    case "SET_VARIANT":
      return { ...state, variant: action.variant };

    case "SET_TAGS":
      return { ...state, tags: action.tags };

    case "SET_LABEL":
      return { ...state, label: action.label.slice(0, 40) };

    default:
      return state;
  }
}

// --- URL builder ---

export function buildCardUrl(
  state: BuilderState,
  baseUrl: string,
  options?: { cacheBuster?: boolean },
): string | null {
  const validUrls = state.urls.filter((u) => parseYouTubeUrl(u) !== null);
  if (validUrls.length === 0) return null;

  const params = new URLSearchParams();

  for (const url of validUrls) {
    params.append("url", url);
  }

  // Theme name mapping
  let themeName = state.styleName;
  if (state.styleType === "classic" && state.styleName === "neon") {
    themeName = "neon-legacy";
  }
  params.set("theme", themeName);

  if (state.layout !== "regular") {
    params.set("layout", state.layout);
  }

  if (state.variant) {
    params.set("variant", state.variant);
  }

  const trimmedTags = state.tags.trim();
  if (trimmedTags) {
    params.set("tags", trimmedTags);
  }

  const trimmedLabel = state.label.trim();
  if (trimmedLabel) {
    params.set("label", trimmedLabel);
  }

  if (options?.cacheBuster) {
    params.set("v", String(Date.now()));
  }

  return `${baseUrl}/api/card.svg?${params.toString()}`;
}

// --- Capabilities ---

export function getStyleCapabilities(
  state: BuilderState,
  themes: ThemesResponse | null,
): StyleCapabilities {
  if (!themes) {
    return {
      supportsLayout: true,
      supportsTags: true,
      supportsLabel: true,
      maxTracks: 1,
      variants: [],
      previewDimensions: { width: 420, height: 120 },
    };
  }

  if (state.styleType === "template") {
    const tmpl = themes.templates.find((t) => t.name === state.styleName);
    if (tmpl) {
      return {
        supportsLayout: "supportsLayout" in tmpl ? (tmpl as TemplateMeta & { supportsLayout?: boolean }).supportsLayout ?? false : false,
        supportsTags: tmpl.supportsTags ?? false,
        supportsLabel: tmpl.supportsLabel ?? false,
        maxTracks: tmpl.maxTracks,
        variants: tmpl.variants,
        previewDimensions: tmpl.previewDimensions,
      };
    }
  }

  // Classic themes: always support layout, tags, label, single track, no variants
  return {
    supportsLayout: true,
    supportsTags: true,
    supportsLabel: true,
    maxTracks: 1,
    variants: [],
    previewDimensions: { width: 420, height: 120 },
  };
}

// --- URL validation ---

export function isValidYouTubeUrl(url: string): boolean {
  return parseYouTubeUrl(url) !== null;
}

// --- Hooks ---

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
