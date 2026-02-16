"use client";

import { useReducer, useEffect, useState, useMemo } from "react";
import {
  builderReducer,
  initialState,
  buildCardUrl,
  getStyleCapabilities,
  useDebounce,
  type ThemesResponse,
} from "@/lib/builder-utils";

import UrlInput from "./builder/UrlInput";
import StyleSelector from "./builder/StyleSelector";
import LayoutSelector from "./builder/LayoutSelector";
import VariantSelector from "./builder/VariantSelector";
import OptionsInput from "./builder/OptionsInput";
import CardPreview from "./preview/CardPreview";
import EmbedCode from "./preview/EmbedCode";

export default function BuilderPage() {
  const [state, dispatch] = useReducer(builderReducer, initialState);
  const [themes, setThemes] = useState<ThemesResponse | null>(null);

  // Fetch themes on mount
  useEffect(() => {
    fetch("/api/themes")
      .then((res) => res.json())
      .then((data: ThemesResponse) => setThemes(data))
      .catch(() => {});
  }, []);

  // Compute base URL (client-side only)
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  // Build URLs
  const previewUrl = useMemo(
    () => buildCardUrl(state, baseUrl, { cacheBuster: true }),
    [state, baseUrl],
  );
  const embedUrl = useMemo(() => buildCardUrl(state, baseUrl), [state, baseUrl]);

  // Debounce preview
  const debouncedPreviewUrl = useDebounce(previewUrl, 500);

  // Capabilities
  const capabilities = useMemo(
    () => getStyleCapabilities(state, themes),
    [state, themes],
  );

  const showLayout = capabilities.supportsLayout;
  const showVariant = capabilities.variants.length > 0;

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      {/* Header */}
      <header className="border-b border-border-subtle">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">SoundBadge</h1>
              <p className="text-sm text-text-muted">Your code has a soundtrack.</p>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border-default px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-8">
          {/* Left: Form */}
          <div className="w-full lg:w-[420px] shrink-0 space-y-6 mt-6 lg:mt-0">
            <UrlInput
              urls={state.urls}
              maxTracks={capabilities.maxTracks}
              supportsMultiTrack={capabilities.maxTracks > 1}
              dispatch={dispatch}
            />

            <StyleSelector
              state={state}
              themes={themes}
              dispatch={dispatch}
            />

            {showLayout && (
              <LayoutSelector
                layout={state.layout}
                dispatch={dispatch}
              />
            )}

            {showVariant && (
              <VariantSelector
                variants={capabilities.variants}
                selected={state.variant}
                dispatch={dispatch}
              />
            )}

            <OptionsInput
              tags={state.tags}
              label={state.label}
              dispatch={dispatch}
            />
          </div>

          {/* Right: Preview (sticky) */}
          <div className="flex-1 lg:sticky lg:top-8 lg:self-start space-y-6">
            <CardPreview previewUrl={debouncedPreviewUrl} />
            <EmbedCode embedUrl={embedUrl} />
          </div>
        </div>
      </main>
    </div>
  );
}
