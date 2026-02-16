"use client";

import { useState } from "react";
import type {
  BuilderAction,
  BuilderState,
  ClassicThemeMeta,
  TemplateMeta,
  ThemesResponse,
} from "@/lib/builder-utils";
import { getStyleCapabilities } from "@/lib/builder-utils";

interface StyleSelectorProps {
  state: BuilderState;
  themes: ThemesResponse | null;
  dispatch: React.Dispatch<BuilderAction>;
}

const CATEGORY_LABELS: Record<string, string> = {
  simple: "Simple",
  player: "Player",
  developer: "Developer",
  visual: "Visual",
};

const CATEGORY_ORDER = ["simple", "player", "developer", "visual"];

export default function StyleSelector({ state, themes, dispatch }: StyleSelectorProps) {
  const [tab, setTab] = useState<"classic" | "templates">(
    state.styleType === "template" ? "templates" : "classic",
  );

  if (!themes) {
    return (
      <section className="space-y-3">
        <label className="block text-sm font-medium text-text-secondary">Style</label>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-surface-input animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  function selectStyle(styleType: "classic" | "template", name: string) {
    const nextState = { ...state, styleType, styleName: name };
    const caps = getStyleCapabilities(nextState, themes);
    dispatch({ type: "SET_STYLE", styleType, styleName: name, capabilities: caps });
  }

  const isSelected = (type: "classic" | "template", name: string) =>
    state.styleType === type && state.styleName === name;

  // Group templates by category
  const grouped = new Map<string, TemplateMeta[]>();
  for (const t of themes.templates) {
    const list = grouped.get(t.category) ?? [];
    list.push(t);
    grouped.set(t.category, list);
  }

  return (
    <section className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">Style</label>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-surface-input p-1">
        <button
          type="button"
          onClick={() => setTab("classic")}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === "classic"
              ? "bg-surface-card text-text-primary"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Classic
        </button>
        <button
          type="button"
          onClick={() => setTab("templates")}
          className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            tab === "templates"
              ? "bg-surface-card text-text-primary"
              : "text-text-muted hover:text-text-secondary"
          }`}
        >
          Templates
        </button>
      </div>

      {/* Classic */}
      {tab === "classic" && (
        <div className="grid grid-cols-4 gap-2">
          {themes.classic.map((theme: ClassicThemeMeta) => (
            <button
              key={theme.name}
              type="button"
              onClick={() => selectStyle("classic", theme.name)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-2.5 transition-all ${
                isSelected("classic", theme.name)
                  ? "border-accent ring-2 ring-accent/30"
                  : "border-border-subtle hover:border-border-default"
              }`}
            >
              <div
                className="h-6 w-full rounded"
                style={{ background: theme.tokens.bg }}
              />
              <div className="flex gap-1">
                {[theme.tokens.fg, theme.tokens.accent, theme.tokens.muted].map((color, ci) => (
                  <span
                    key={ci}
                    className="block h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-[11px] text-text-muted leading-none">{theme.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Templates */}
      {tab === "templates" && (
        <div className="space-y-4">
          {CATEGORY_ORDER.filter((cat) => grouped.has(cat)).map((cat) => (
            <div key={cat} className="space-y-2">
              <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {CATEGORY_LABELS[cat] ?? cat}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {grouped.get(cat)!.map((tmpl: TemplateMeta) => (
                  <button
                    key={tmpl.name}
                    type="button"
                    onClick={() => selectStyle("template", tmpl.name)}
                    className={`flex flex-col items-start gap-1 rounded-lg border p-3 text-left transition-all ${
                      isSelected("template", tmpl.name)
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-border-subtle hover:border-border-default"
                    }`}
                  >
                    <span className="text-sm font-medium text-text-primary">{tmpl.label}</span>
                    <span className="text-xs text-text-muted leading-tight">{tmpl.description}</span>
                    <span className="text-[10px] text-text-muted">
                      {tmpl.previewDimensions.width}×{tmpl.previewDimensions.height}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
