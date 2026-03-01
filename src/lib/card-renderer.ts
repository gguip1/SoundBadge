import type { Theme, Pattern } from "@/themes/types";
import type { LayoutConfig } from "@/layouts/types";
import type { YouTubeMetadata } from "./youtube";
import { fetchImageAsBase64, truncate, esc, estimateTextWidth, truncateToFit } from "@/templates/utils";

const MARQUEE_GAP = 80;
const MARQUEE_SPEED = 50;

export interface CardOptions {
  theme: Theme;
  layout: LayoutConfig;
  metadata: YouTubeMetadata;
  tags?: string[];
  label?: string;
}

export async function renderCardSvg(options: CardOptions): Promise<string> {
  const { theme, layout, metadata, tags, label } = options;
  const { tokens } = theme;
  const { width, height, padding, thumbnailSize, titleSize, subtitleSize } = layout;

  const thumbnailBase64 = await fetchImageAsBase64(metadata.thumbnailUrl);

  const thumbX = padding;
  const thumbY = Math.round((height - thumbnailSize) / 2);
  const thumbRadius = Math.min(12, tokens.radius);

  const textX = padding + thumbnailSize + padding;
  const textMaxWidth = width - textX - padding;

  // 텍스트 Y 위치 계산
  const hasLabel = !!label;
  const hasTags = tags && tags.length > 0;
  const contentLines = 2 + (hasLabel ? 1 : 0) + (hasTags ? 1 : 0);
  const lineHeight = 1.4;
  const totalTextHeight =
    (hasLabel ? subtitleSize * lineHeight : 0) +
    titleSize * lineHeight +
    subtitleSize * lineHeight +
    (hasTags ? subtitleSize * lineHeight : 0);
  const textStartY = Math.round((height - totalTextHeight) / 2);

  let currentY = textStartY;

  // 텍스트 truncation (CJK 폭 반영)
  const titleFullWidth = estimateTextWidth(metadata.title, titleSize, 0.55);
  const titleNeedsScroll = titleFullWidth > textMaxWidth;
  const truncatedTitle = truncateToFit(metadata.title, textMaxWidth, titleSize, 0.55);
  const truncatedChannel = truncateToFit(metadata.channelName, textMaxWidth, subtitleSize, 0.55);

  // SVG 조립
  const defs = buildDefs(tokens, width, height, thumbX, thumbY, thumbnailSize, thumbRadius);

  let svgContent = "";

  // 배경
  svgContent += renderBackground(tokens, width, height);

  // 패턴 오버레이
  if (tokens.pattern !== "none") {
    svgContent += `  <rect width="${width}" height="${height}" rx="${tokens.radius}" fill="url(#pattern)" opacity="0.15" />\n`;
  }

  // 테두리
  if (tokens.border !== "none") {
    svgContent += `  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${tokens.radius}" fill="none" stroke="${esc(tokens.border)}" stroke-width="1" />\n`;
  }

  // 썸네일
  if (thumbnailBase64) {
    svgContent += `  <image href="${thumbnailBase64}" x="${thumbX}" y="${thumbY}" width="${thumbnailSize}" height="${thumbnailSize}" clip-path="url(#thumbClip)" preserveAspectRatio="xMidYMid slice" />\n`;
  } else {
    // 썸네일 fallback: 음표 아이콘 배경
    svgContent += `  <rect x="${thumbX}" y="${thumbY}" width="${thumbnailSize}" height="${thumbnailSize}" rx="${thumbRadius}" fill="${esc(tokens.accent)}" opacity="0.2" />\n`;
    svgContent += `  <text x="${thumbX + thumbnailSize / 2}" y="${thumbY + thumbnailSize / 2 + titleSize / 3}" font-size="${titleSize * 1.5}" fill="${esc(tokens.accent)}" text-anchor="middle" font-family="system-ui, sans-serif">&#9835;</text>\n`;
  }

  // Label (옵션)
  if (hasLabel) {
    svgContent += `  <text x="${textX}" y="${currentY + subtitleSize}" font-size="${subtitleSize - 1}" fill="${esc(tokens.accent)}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="600" letter-spacing="0.5">${esc(truncate(label!, 30).toUpperCase())}</text>\n`;
    currentY += Math.round(subtitleSize * lineHeight);
  }

  // Title (with continuous marquee if overflows)
  if (titleNeedsScroll) {
    const loopDist = Math.ceil(titleFullWidth + MARQUEE_GAP);
    const duration = Math.max(4, loopDist / MARQUEE_SPEED);
    const clipY = currentY;
    const secondX = textX + loopDist;
    svgContent += `  <defs>\n`;
    svgContent += `    <clipPath id="titleClip"><rect x="${textX}" y="${clipY}" width="${textMaxWidth}" height="${Math.round(titleSize * 1.5)}" /></clipPath>\n`;
    svgContent += `    <style>@keyframes titleScroll{0%{transform:translateX(0)}100%{transform:translateX(-${loopDist}px)}}.title-marquee{animation:titleScroll ${duration.toFixed(1)}s linear infinite}</style>\n`;
    svgContent += `  </defs>\n`;
    svgContent += `  <g clip-path="url(#titleClip)">\n`;
    svgContent += `    <g class="title-marquee">\n`;
    svgContent += `      <text x="${textX}" y="${currentY + titleSize}" font-size="${titleSize}" fill="${esc(tokens.fg)}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="bold">${esc(metadata.title)}</text>\n`;
    svgContent += `      <text x="${secondX}" y="${currentY + titleSize}" font-size="${titleSize}" fill="${esc(tokens.fg)}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="bold">${esc(metadata.title)}</text>\n`;
    svgContent += `    </g>\n`;
    svgContent += `  </g>\n`;
  } else {
    svgContent += `  <text x="${textX}" y="${currentY + titleSize}" font-size="${titleSize}" fill="${esc(tokens.fg)}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="bold">${esc(truncatedTitle)}</text>\n`;
  }
  currentY += Math.round(titleSize * lineHeight);

  // Channel
  svgContent += `  <text x="${textX}" y="${currentY + subtitleSize}" font-size="${subtitleSize}" fill="${esc(tokens.muted)}" font-family="'Segoe UI', system-ui, sans-serif">${esc(truncatedChannel)}</text>\n`;
  currentY += Math.round(subtitleSize * lineHeight);

  // Tags (옵션)
  if (hasTags) {
    currentY += 2;
    let tagX = textX;
    for (const tag of tags!) {
      const tagText = truncate(tag.trim(), 15);
      const tagWidth = estimateTextWidth(tagText, subtitleSize - 2) + 16;
      if (tagX + tagWidth > width - padding) break;
      svgContent += `  <rect x="${tagX}" y="${currentY}" width="${tagWidth}" height="${subtitleSize + 6}" rx="${(subtitleSize + 6) / 2}" fill="${esc(tokens.accent)}" opacity="0.15" />\n`;
      svgContent += `  <text x="${tagX + 8}" y="${currentY + subtitleSize + 1}" font-size="${subtitleSize - 2}" fill="${esc(tokens.accent)}" font-family="'Segoe UI', system-ui, sans-serif">${esc(tagText)}</text>\n`;
      tagX += tagWidth + 6;
    }
  }

  // 하단 accent line
  const lineY = height - 3;
  svgContent += `  <rect x="${padding}" y="${lineY}" width="${width - padding * 2}" height="2" rx="1" fill="${esc(tokens.accent)}" opacity="0.4" />\n`;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${defs}
${svgContent}</svg>`;
}

function renderBackground(tokens: Theme["tokens"], width: number, height: number): string {
  const { bg, radius, shadow } = tokens;

  let shadowFilter = "";
  if (shadow !== "none") {
    shadowFilter = ` filter="url(#shadow)"`;
  }

  // 그라데이션 배경
  if (bg.startsWith("linear-gradient")) {
    return `  <rect width="${width}" height="${height}" rx="${radius}" fill="url(#bgGradient)"${shadowFilter} />\n`;
  }

  // 반투명 배경 (glass 등)
  if (bg.startsWith("rgba")) {
    return `  <rect width="${width}" height="${height}" rx="${radius}" fill="${esc(bg)}"${shadowFilter} />\n`;
  }

  // 단색
  return `  <rect width="${width}" height="${height}" rx="${radius}" fill="${esc(bg)}"${shadowFilter} />\n`;
}

function buildDefs(
  tokens: Theme["tokens"],
  width: number,
  height: number,
  thumbX: number,
  thumbY: number,
  thumbSize: number,
  thumbRadius: number,
): string {
  let defs = "  <defs>\n";

  // 썸네일 clip-path
  defs += `    <clipPath id="thumbClip"><rect x="${thumbX}" y="${thumbY}" width="${thumbSize}" height="${thumbSize}" rx="${thumbRadius}" /></clipPath>\n`;

  // 그라데이션 배경
  if (tokens.bg.startsWith("linear-gradient")) {
    const parsed = parseGradient(tokens.bg);
    defs += `    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">\n`;
    for (const stop of parsed) {
      defs += `      <stop offset="${stop.offset}" stop-color="${stop.color}" />\n`;
    }
    defs += `    </linearGradient>\n`;
  }

  // 그림자 필터
  if (tokens.shadow !== "none") {
    defs += `    <filter id="shadow" x="-5%" y="-5%" width="110%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.15" />
    </filter>\n`;
  }

  // 패턴
  defs += buildPatternDef(tokens.pattern, tokens.accent);

  defs += "  </defs>\n";
  return defs;
}

function buildPatternDef(pattern: Pattern, accent: string): string {
  if (pattern === "none") return "";

  if (pattern === "grid") {
    return `    <pattern id="pattern" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="${esc(accent)}" stroke-width="0.5" />
    </pattern>\n`;
  }

  if (pattern === "dots") {
    return `    <pattern id="pattern" width="12" height="12" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="6" r="1" fill="${esc(accent)}" />
    </pattern>\n`;
  }

  if (pattern === "noise") {
    return `    <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /></filter>
    <pattern id="pattern" width="100%" height="100%" patternUnits="objectBoundingBox">
      <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.5" />
    </pattern>\n`;
  }

  return "";
}

function parseGradient(css: string): { offset: string; color: string }[] {
  // "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #ff99ac 100%)" 형태 파싱
  const match = css.match(/linear-gradient\([^,]+,(.+)\)/);
  if (!match) return [{ offset: "0%", color: "#000" }];

  const stops = match[1].split(",").map((s) => s.trim());
  return stops.map((stop) => {
    const parts = stop.split(/\s+/);
    const color = parts[0] ?? "#000";
    const offset = parts[1] ?? "0%";
    return { offset, color };
  });
}

