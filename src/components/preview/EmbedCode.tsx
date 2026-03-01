"use client";

import { useState } from "react";

interface EmbedCodeProps {
  embedUrl: string | null;
  youtubeUrl?: string;
}

type Tab = "markdown" | "html" | "url";

export default function EmbedCode({ embedUrl, youtubeUrl }: EmbedCodeProps) {
  const [tab, setTab] = useState<Tab>("markdown");
  const [copied, setCopied] = useState(false);

  const disabled = !embedUrl;
  const linkUrl = youtubeUrl || embedUrl;

  const code = embedUrl
    ? {
        markdown: `[![SoundBadge](${embedUrl})](${linkUrl})`,
        html: `<a href="${linkUrl}"><img src="${embedUrl}" alt="SoundBadge" /></a>`,
        url: embedUrl,
      }
    : { markdown: "", html: "", url: "" };

  const currentCode = code[tab];

  async function handleCopy() {
    if (!currentCode) return;
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select textarea
    }
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "markdown", label: "Markdown" },
    { key: "html", label: "HTML" },
    { key: "url", label: "URL" },
  ];

  return (
    <section className="space-y-3">
      <label className="block text-sm font-medium text-text-secondary">Embed Code</label>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-surface-input p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            disabled={disabled}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${
              tab === t.key
                ? "bg-surface-card text-text-primary"
                : "text-text-muted hover:text-text-secondary"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="relative">
        <pre
          className={`overflow-x-auto rounded-lg border border-border-subtle bg-surface-input p-3 text-xs leading-relaxed ${
            disabled ? "text-text-muted" : "text-text-secondary"
          }`}
        >
          <code className="break-all whitespace-pre-wrap">
            {disabled ? "YouTube URL을 입력하면 코드가 생성됩니다" : currentCode}
          </code>
        </pre>

        {!disabled && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-2 top-2 rounded-md border border-border-default bg-surface-card px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
    </section>
  );
}
