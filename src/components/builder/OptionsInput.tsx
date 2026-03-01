"use client";

import type { BuilderAction } from "@/lib/builder-utils";

interface OptionsInputProps {
  tags: string;
  label: string;
  disableTags: boolean;
  disableLabel: boolean;
  dispatch: React.Dispatch<BuilderAction>;
}

export default function OptionsInput({ tags, label, disableTags, disableLabel, dispatch }: OptionsInputProps) {
  return (
    <section className="space-y-4">
      <div className={`space-y-2 transition-opacity ${disableTags ? "opacity-40 pointer-events-none" : ""}`}>
        <label className="block text-sm font-medium text-text-secondary">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => dispatch({ type: "SET_TAGS", tags: e.target.value })}
          placeholder="indie, chill, lofi"
          disabled={disableTags}
          className="w-full rounded-lg border border-border-default bg-surface-input px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent disabled:cursor-not-allowed"
        />
        <p className="text-xs text-text-muted">콤마 구분, 최대 3개</p>
      </div>

      <div className={`space-y-2 transition-opacity ${disableLabel ? "opacity-40 pointer-events-none" : ""}`}>
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
          disabled={disableLabel}
          className="w-full rounded-lg border border-border-default bg-surface-input px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent disabled:cursor-not-allowed"
        />
      </div>
    </section>
  );
}
