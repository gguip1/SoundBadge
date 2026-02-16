import type { Theme } from "@/themes/types";
import type { LayoutConfig } from "@/layouts/types";
import type { YouTubeMetadata } from "./youtube";

export interface CardOptions {
  theme: Theme;
  layout: LayoutConfig;
  metadata: YouTubeMetadata;
  tags?: string[];
  label?: string;
}

export function renderCardSvg(options: CardOptions): string {
  // TODO: SVG 카드 렌더링 구현
  const { theme, layout, metadata } = options;
  const { tokens } = theme;
  const { width, height } = layout;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" rx="${tokens.radius}" fill="${tokens.bg}" />
  <text x="${layout.padding}" y="${layout.padding + layout.titleSize}" font-size="${layout.titleSize}" fill="${tokens.fg}" font-family="system-ui, sans-serif" font-weight="bold">
    ${escapeXml(metadata.title)}
  </text>
  <text x="${layout.padding}" y="${layout.padding + layout.titleSize + layout.subtitleSize + 4}" font-size="${layout.subtitleSize}" fill="${tokens.muted}" font-family="system-ui, sans-serif">
    ${escapeXml(metadata.channelName)}
  </text>
</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
