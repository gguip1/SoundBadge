"use client";

import type { BuilderAction } from "@/lib/builder-utils";

interface LayoutSelectorProps {
  layout: "compact" | "regular" | "wide";
  dispatch: React.Dispatch<BuilderAction>;
}

const LAYOUTS = [
  { value: "compact" as const, label: "Compact", size: "320×80" },
  { value: "regular" as const, label: "Regular", size: "420×120" },
  { value: "wide" as const, label: "Wide", size: "600×160" },
];

export default function LayoutSelector({ layout, dispatch }: LayoutSelectorProps) {
  return (
    <section className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">Layout</label>
      <div className="flex gap-1 rounded-lg bg-surface-input p-1">
        {LAYOUTS.map((l) => (
          <button
            key={l.value}
            type="button"
            onClick={() => dispatch({ type: "SET_LAYOUT", layout: l.value })}
            className={`flex-1 rounded-md px-2 py-2 text-center transition-colors ${
              layout === l.value
                ? "bg-surface-card text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <span className="block text-sm font-medium">{l.label}</span>
            <span className="block text-[10px] text-text-muted">{l.size}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
