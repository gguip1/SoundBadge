"use client";

import type { BuilderAction } from "@/lib/builder-utils";

interface VariantSelectorProps {
  variants: string[];
  selected: string | undefined;
  dispatch: React.Dispatch<BuilderAction>;
}

const VARIANT_COLORS: Record<string, string> = {
  // badge variants
  blue: "#007ec6",
  green: "#1DB954",
  red: "#ef4444",
  purple: "#8b5cf6",
  orange: "#fe7d37",
  // neon variants
  pink: "#ff00ff",
  cyan: "#00ffff",
};

export default function VariantSelector({ variants, selected, dispatch }: VariantSelectorProps) {
  return (
    <section className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">Variant</label>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isActive = selected === v;
          const color = VARIANT_COLORS[v] ?? "#6366f1";

          return (
            <button
              key={v}
              type="button"
              onClick={() => dispatch({ type: "SET_VARIANT", variant: v })}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "border-accent ring-2 ring-accent/30 text-text-primary"
                  : "border-border-subtle text-text-muted hover:border-border-default"
              }`}
            >
              <span
                className="block h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              {v}
            </button>
          );
        })}
      </div>
    </section>
  );
}
