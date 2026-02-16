import type { Template, TemplateRenderOptions, TrackData } from "./types";
import { LAYOUTS } from "@/layouts/types";
import type { LayoutName } from "@/layouts/types";
import { truncate, esc } from "./utils";

const ACCENT = "#6366f1";
const BG = "#ffffff";
const FG = "#1e1e2e";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const EXTRA_TRACK_HEIGHT = 40;
const MARQUEE_GAP = 80;
const MARQUEE_SPEED = 50;

export const cleanTemplate: Template = {
  meta: {
    id: "clean",
    displayName: "Clean",
    description: "깔끔한 기본 카드 (레이아웃 지원)",
    category: "simple",
    supportsLayout: true,
    supportsMultiTrack: true,
    maxTracks: 5,
    variants: [],
    previewDimensions: { width: 420, height: 120 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, tracks, layout, tags, label } = options;
    const layoutConfig = LAYOUTS[layout] ?? LAYOUTS.regular;
    const { width, padding, thumbnailSize, titleSize, subtitleSize } = layoutConfig;

    const extraTracks = tracks.slice(1);
    const extraHeight = extraTracks.length * EXTRA_TRACK_HEIGHT;
    const height = layoutConfig.height + extraHeight;

    const thumbX = padding;
    const thumbY = Math.round((layoutConfig.height - thumbnailSize) / 2);
    const thumbRadius = 12;

    const textX = padding + thumbnailSize + padding;
    const textMaxWidth = width - textX - padding;
    const titleCharWidth = titleSize * 0.55;
    const maxTitleChars = Math.floor(textMaxWidth / titleCharWidth);
    const maxSubChars = Math.floor(textMaxWidth / (subtitleSize * 0.55));

    const titleNeedsScroll = track.title.length > maxTitleChars;
    const titleFullWidth = track.title.length * titleCharWidth;

    const hasLabel = !!label;
    const hasTags = tags && tags.length > 0;
    const lineHeight = 1.4;
    const totalTextHeight =
      (hasLabel ? subtitleSize * lineHeight : 0) +
      titleSize * lineHeight +
      subtitleSize * lineHeight +
      (hasTags ? subtitleSize * lineHeight : 0);
    let currentY = Math.round((layoutConfig.height - totalTextHeight) / 2);

    let svg = "";

    // defs
    svg += `  <defs>\n`;
    svg += `    <clipPath id="thumbClip"><rect x="${thumbX}" y="${thumbY}" width="${thumbnailSize}" height="${thumbnailSize}" rx="${thumbRadius}" /></clipPath>\n`;
    svg += `    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%"><feDropShadow dx="0" dy="2" stdDeviation="6" flood-opacity="0.08" /></filter>\n`;

    let styleBlock = `@keyframes fadeIn{from{opacity:0}to{opacity:1}}.card{animation:fadeIn .4s ease}`;
    if (titleNeedsScroll) {
      const loopDist = Math.ceil(titleFullWidth + MARQUEE_GAP);
      const duration = Math.max(4, loopDist / MARQUEE_SPEED);
      svg += `    <clipPath id="titleClip"><rect x="${textX}" y="0" width="${textMaxWidth}" height="${layoutConfig.height}" /></clipPath>\n`;
      styleBlock += `@keyframes cleanScroll{0%{transform:translateX(0)}100%{transform:translateX(-${loopDist}px)}}.clean-marquee{animation:cleanScroll ${duration.toFixed(1)}s linear infinite}`;
    }
    svg += `    <style>${styleBlock}</style>\n`;
    svg += `  </defs>\n`;

    // background
    svg += `  <rect width="${width}" height="${height}" rx="16" fill="${BG}" filter="url(#shadow)" />\n`;
    svg += `  <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="16" fill="none" stroke="${BORDER}" stroke-width="1" />\n`;

    // thumbnail
    if (track.thumbnailBase64) {
      svg += `  <image href="${track.thumbnailBase64}" x="${thumbX}" y="${thumbY}" width="${thumbnailSize}" height="${thumbnailSize}" clip-path="url(#thumbClip)" preserveAspectRatio="xMidYMid slice" />\n`;
    } else {
      svg += `  <rect x="${thumbX}" y="${thumbY}" width="${thumbnailSize}" height="${thumbnailSize}" rx="${thumbRadius}" fill="${ACCENT}" opacity="0.15" />\n`;
      svg += `  <text x="${thumbX + thumbnailSize / 2}" y="${thumbY + thumbnailSize / 2 + 6}" font-size="20" fill="${ACCENT}" text-anchor="middle" font-family="system-ui">&#9835;</text>\n`;
    }

    // label
    if (hasLabel) {
      svg += `  <text x="${textX}" y="${currentY + subtitleSize}" font-size="${subtitleSize - 1}" fill="${ACCENT}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="600" letter-spacing="0.5">${esc(truncate(label!, 30).toUpperCase())}</text>\n`;
      currentY += Math.round(subtitleSize * lineHeight);
    }

    // title (with continuous marquee if overflows)
    if (titleNeedsScroll) {
      const loopDist = Math.ceil(titleFullWidth + MARQUEE_GAP);
      const secondX = textX + loopDist;
      svg += `  <g clip-path="url(#titleClip)">\n`;
      svg += `    <g class="clean-marquee">\n`;
      svg += `      <text x="${textX}" y="${currentY + titleSize}" font-size="${titleSize}" fill="${FG}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="bold">${esc(track.title)}</text>\n`;
      svg += `      <text x="${secondX}" y="${currentY + titleSize}" font-size="${titleSize}" fill="${FG}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="bold">${esc(track.title)}</text>\n`;
      svg += `    </g>\n`;
      svg += `  </g>\n`;
    } else {
      svg += `  <text x="${textX}" y="${currentY + titleSize}" font-size="${titleSize}" fill="${FG}" font-family="'Segoe UI', system-ui, sans-serif" font-weight="bold">${esc(truncate(track.title, maxTitleChars))}</text>\n`;
    }
    currentY += Math.round(titleSize * lineHeight);

    // channel
    svg += `  <text x="${textX}" y="${currentY + subtitleSize}" font-size="${subtitleSize}" fill="${MUTED}" font-family="'Segoe UI', system-ui, sans-serif">${esc(truncate(track.channelName, maxSubChars))}</text>\n`;
    currentY += Math.round(subtitleSize * lineHeight);

    // tags
    if (hasTags) {
      currentY += 2;
      let tagX = textX;
      for (const tag of tags!) {
        const tagText = truncate(tag.trim(), 15);
        const tagWidth = tagText.length * (subtitleSize * 0.55) + 16;
        if (tagX + tagWidth > width - padding) break;
        svg += `  <rect x="${tagX}" y="${currentY}" width="${tagWidth}" height="${subtitleSize + 6}" rx="${(subtitleSize + 6) / 2}" fill="${ACCENT}" opacity="0.1" />\n`;
        svg += `  <text x="${tagX + 8}" y="${currentY + subtitleSize + 1}" font-size="${subtitleSize - 2}" fill="${ACCENT}" font-family="'Segoe UI', system-ui, sans-serif">${esc(tagText)}</text>\n`;
        tagX += tagWidth + 6;
      }
    }

    // extra tracks
    if (extraTracks.length > 0) {
      let trackY = layoutConfig.height;
      // divider
      svg += `  <line x1="${padding}" y1="${trackY}" x2="${width - padding}" y2="${trackY}" stroke="${BORDER}" stroke-width="1" />\n`;

      for (const t of extraTracks) {
        const ty = trackY + EXTRA_TRACK_HEIGHT / 2;
        svg += `  <text x="${padding + 8}" y="${ty + 4}" font-size="${subtitleSize}" fill="${FG}" font-family="'Segoe UI', system-ui, sans-serif">${esc(truncate(t.title, 35))}</text>\n`;
        svg += `  <text x="${width - padding}" y="${ty + 4}" font-size="${subtitleSize - 1}" fill="${MUTED}" font-family="'Segoe UI', system-ui, sans-serif" text-anchor="end">${esc(truncate(t.channelName, 20))}</text>\n`;
        trackY += EXTRA_TRACK_HEIGHT;
      }
    }

    // accent line
    svg += `  <rect x="${padding}" y="${height - 3}" width="${width - padding * 2}" height="2" rx="1" fill="${ACCENT}" opacity="0.3" />\n`;

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" class="card">
${svg}</svg>`;
  },
};
