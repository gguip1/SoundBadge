"use client";

import { useState, useCallback, useEffect, useRef } from "react";

interface CardPreviewProps {
  previewUrl: string | null;
}

export default function CardPreview({ previewUrl }: CardPreviewProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [retryKey, setRetryKey] = useState(0);
  const prevUrl = useRef(previewUrl);

  // Set loading when URL changes
  useEffect(() => {
    if (previewUrl && previewUrl !== prevUrl.current) {
      setStatus("loading");
    }
    prevUrl.current = previewUrl;
  }, [previewUrl]);

  const handleLoad = useCallback(() => setStatus("loaded"), []);
  const handleError = useCallback(() => setStatus("error"), []);

  const handleRetry = () => {
    setRetryKey((k) => k + 1);
    setStatus("loading");
  };

  if (!previewUrl) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border-subtle bg-surface-card p-8">
        <div className="text-center">
          <p className="text-2xl mb-2 opacity-40">&#9835;</p>
          <p className="text-sm text-text-muted">YouTube URL을 입력하면<br />미리보기가 표시됩니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Checkerboard background to show transparency */}
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-xl border border-border-subtle p-6"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #1a1a1e 25%, transparent 25%), linear-gradient(-45deg, #1a1a1e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1e 75%), linear-gradient(-45deg, transparent 75%, #1a1a1e 75%)",
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          backgroundColor: "#141416",
        }}
      >
        {/* Loading spinner */}
        {status === "loading" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface-card/60">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`${previewUrl}-${retryKey}`}
          src={previewUrl}
          alt="Card preview"
          className={`max-w-full transition-opacity duration-300 ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
          onLoad={handleLoad}
          onError={handleError}
        />

        {status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-surface-card/80">
            <p className="text-sm text-error">미리보기를 불러올 수 없습니다</p>
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-lg border border-border-default px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
