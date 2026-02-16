"use client";

import { isValidYouTubeUrl, type BuilderAction } from "@/lib/builder-utils";

interface UrlInputProps {
  urls: string[];
  maxTracks: number;
  supportsMultiTrack: boolean;
  dispatch: React.Dispatch<BuilderAction>;
}

export default function UrlInput({ urls, maxTracks, supportsMultiTrack, dispatch }: UrlInputProps) {
  const canAdd = supportsMultiTrack && urls.length < maxTracks;

  return (
    <section className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">
        YouTube URL
      </label>

      {urls.map((url, i) => {
        const hasValue = url.trim().length > 0;
        const isValid = hasValue && isValidYouTubeUrl(url);
        const isInvalid = hasValue && !isValid;

        return (
          <div key={i} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="url"
                value={url}
                onChange={(e) => dispatch({ type: "SET_URL", index: i, value: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
                className={`w-full rounded-lg border bg-surface-input px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors ${
                  isInvalid
                    ? "border-error"
                    : isValid
                      ? "border-success"
                      : "border-border-default focus:border-accent"
                }`}
              />
              {hasValue && (
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-sm ${isValid ? "text-success" : "text-error"}`}>
                  {isValid ? "✓" : "✗"}
                </span>
              )}
            </div>

            {urls.length > 1 && (
              <button
                type="button"
                onClick={() => dispatch({ type: "REMOVE_URL", index: i })}
                className="shrink-0 rounded-lg border border-border-default p-2.5 text-text-muted hover:border-error hover:text-error transition-colors"
                aria-label="URL 삭제"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            )}
          </div>
        );
      })}

      {canAdd && (
        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_URL" })}
          className="text-sm text-accent hover:text-accent-hover transition-colors"
        >
          + URL 추가
        </button>
      )}
    </section>
  );
}
