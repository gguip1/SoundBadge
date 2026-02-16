"use client";

import type { BuilderAction } from "@/lib/builder-utils";

interface OptionsInputProps {
  tags: string;
  label: string;
  dispatch: React.Dispatch<BuilderAction>;
}

export default function OptionsInput({ tags, label, dispatch }: OptionsInputProps) {
  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => dispatch({ type: "SET_TAGS", tags: e.target.value })}
          placeholder="indie, chill, lofi"
          className="w-full rounded-lg border border-border-default bg-surface-input px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
        />
        <p className="text-xs text-text-muted">콤마 구분, 최대 3개</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-text-secondary">Label</label>
          <span className="text-xs text-text-muted">{label.length}/40</span>
        </div>
        <input
          type="text"
          value={label}
          onChange={(e) => dispatch({ type: "SET_LABEL", label: e.target.value })}
          placeholder="Now Playing"
          maxLength={40}
          className="w-full rounded-lg border border-border-default bg-surface-input px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent"
        />
      </div>
    </section>
  );
}
