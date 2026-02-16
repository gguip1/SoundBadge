import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc } from "./utils";

const FG = "#ffffff";
const MUTED = "#b3b3b3";
const FONT = "'Segoe UI', system-ui, -apple-system, sans-serif";
const EXTRA_TRACK_HEIGHT = 40;
const TITLE_FONT_SIZE = 16;
const TITLE_CHAR_WIDTH = TITLE_FONT_SIZE * 0.58;
const TITLE_MAX_CHARS = 30;
const MARQUEE_GAP = 80;
const MARQUEE_SPEED = 50; // px per second

const VARIANTS: Record<string, { accent: string; bg: string }> = {
  green: { accent: "#1DB954", bg: "#191414" },
  purple: { accent: "#8b5cf6", bg: "#1a1625" },
  blue: { accent: "#3b82f6", bg: "#141a24" },
  pink: { accent: "#ec4899", bg: "#1f1418" },
  red: { accent: "#ef4444", bg: "#1a1414" },
};

export const streamTemplate: Template = {
  meta: {
    id: "stream",
    displayName: "Stream",
    description: "스트리밍 플레이어 스타일 카드",
    category: "player",
    supportsLayout: false,
    supportsMultiTrack: true,
    maxTracks: 5,
    variants: Object.keys(VARIANTS),
    previewDimensions: { width: 480, height: 180 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, tracks, variant } = options;
    const colors = VARIANTS[variant ?? "green"] ?? VARIANTS.green;
    const ACCENT = colors.accent;
    const BG = colors.bg;
    const width = 480;
    const baseHeight = 180;
    const extraTracks = tracks.slice(1);
    const height = baseHeight + extraTracks.length * EXTRA_TRACK_HEIGHT;

    const pad = 20;
    const artSize = 100;
    const artX = pad;
    const artY = pad;
    const artRadius = 8;
    const textX = artX + artSize + pad;
    const textMaxWidth = width - textX - pad;

    const titleNeedsScroll = track.title.length > TITLE_MAX_CHARS;
    const titleText = titleNeedsScroll ? track.title : truncate(track.title, TITLE_MAX_CHARS);
    const titleFullWidth = track.title.length * TITLE_CHAR_WIDTH;
    const titleOverflow = titleFullWidth - textMaxWidth;

    let svg = "";

    // defs
    svg += `  <defs>\n`;
    svg += `    <clipPath id="artClip"><rect x="${artX}" y="${artY}" width="${artSize}" height="${artSize}" rx="${artRadius}" /></clipPath>\n`;

    if (titleNeedsScroll) {
      svg += `    <clipPath id="titleClip"><rect x="${textX}" y="${pad}" width="${textMaxWidth}" height="28" /></clipPath>\n`;
    }

    // equalizer positioned to the right of controls, slightly lower
    const eqBase = pad + 58 + 32 + 8;

    svg += `    <style>\n`;
    svg += `      @keyframes eq1{0%,100%{height:6px;y:${eqBase + 14}px}50%{height:20px;y:${eqBase}px}}\n`;
    svg += `      @keyframes eq2{0%,100%{height:14px;y:${eqBase + 6}px}50%{height:8px;y:${eqBase + 12}px}}\n`;
    svg += `      @keyframes eq3{0%,100%{height:10px;y:${eqBase + 10}px}50%{height:20px;y:${eqBase}px}}\n`;
    svg += `      @keyframes eq4{0%,100%{height:16px;y:${eqBase + 4}px}50%{height:4px;y:${eqBase + 16}px}}\n`;
    svg += `      .eq1{animation:eq1 .8s ease-in-out infinite}\n`;
    svg += `      .eq2{animation:eq2 .6s ease-in-out infinite}\n`;
    svg += `      .eq3{animation:eq3 1s ease-in-out infinite}\n`;
    svg += `      .eq4{animation:eq4 .7s ease-in-out infinite}\n`;

    if (titleNeedsScroll) {
      const loopDist = Math.ceil(titleFullWidth + MARQUEE_GAP);
      const duration = Math.max(4, loopDist / MARQUEE_SPEED);
      svg += `      @keyframes streamScroll{0%{transform:translateX(0)}100%{transform:translateX(-${loopDist}px)}}\n`;
      svg += `      .stream-marquee{animation:streamScroll ${duration.toFixed(1)}s linear infinite}\n`;
    }

    svg += `    </style>\n`;
    svg += `  </defs>\n`;

    // background
    svg += `  <rect width="${width}" height="${height}" rx="12" fill="${BG}" />\n`;

    // album art
    if (track.thumbnailBase64) {
      svg += `  <image href="${track.thumbnailBase64}" x="${artX}" y="${artY}" width="${artSize}" height="${artSize}" clip-path="url(#artClip)" preserveAspectRatio="xMidYMid slice" />\n`;
    } else {
      svg += `  <rect x="${artX}" y="${artY}" width="${artSize}" height="${artSize}" rx="${artRadius}" fill="#282828" />\n`;
      svg += `  <text x="${artX + artSize / 2}" y="${artY + artSize / 2 + 8}" font-size="28" fill="${ACCENT}" text-anchor="middle" font-family="system-ui">&#9835;</text>\n`;
    }

    // title (with continuous marquee if needed)
    if (titleNeedsScroll) {
      const secondX = textX + Math.ceil(titleFullWidth + MARQUEE_GAP);
      svg += `  <g clip-path="url(#titleClip)">\n`;
      svg += `    <g class="stream-marquee">\n`;
      svg += `      <text x="${textX}" y="${pad + 22}" font-size="${TITLE_FONT_SIZE}" fill="${FG}" font-family="${FONT}" font-weight="bold">${esc(track.title)}</text>\n`;
      svg += `      <text x="${secondX}" y="${pad + 22}" font-size="${TITLE_FONT_SIZE}" fill="${FG}" font-family="${FONT}" font-weight="bold">${esc(track.title)}</text>\n`;
      svg += `    </g>\n`;
      svg += `  </g>\n`;
    } else {
      svg += `  <text x="${textX}" y="${pad + 22}" font-size="${TITLE_FONT_SIZE}" fill="${FG}" font-family="${FONT}" font-weight="bold">${esc(titleText)}</text>\n`;
    }

    // channel
    svg += `  <text x="${textX}" y="${pad + 42}" font-size="13" fill="${MUTED}" font-family="${FONT}">${esc(truncate(track.channelName, 35))}</text>\n`;

    // progress bar
    const barX = textX;
    const barY = pad + 58;
    const barWidth = width - textX - pad;
    const barHeight = 4;
    const progress = 0.35;

    svg += `  <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="2" fill="#404040" />\n`;
    svg += `  <rect x="${barX}" y="${barY}" width="${Math.round(barWidth * progress)}" height="${barHeight}" rx="2" fill="${ACCENT}" />\n`;
    svg += `  <circle cx="${barX + Math.round(barWidth * progress)}" cy="${barY + 2}" r="5" fill="${ACCENT}" />\n`;

    // time labels
    svg += `  <text x="${barX}" y="${barY + 18}" font-size="10" fill="${MUTED}" font-family="${FONT}">1:12</text>\n`;
    svg += `  <text x="${barX + barWidth}" y="${barY + 18}" font-size="10" fill="${MUTED}" font-family="${FONT}" text-anchor="end">3:24</text>\n`;

    // playback controls (decorative)
    const ctrlY = barY + 32;
    const ctrlCenterX = barX + barWidth / 2;

    // prev
    svg += `  <polygon points="${ctrlCenterX - 30},${ctrlY} ${ctrlCenterX - 18},${ctrlY - 7} ${ctrlCenterX - 18},${ctrlY + 7}" fill="${MUTED}" />\n`;
    svg += `  <polygon points="${ctrlCenterX - 40},${ctrlY} ${ctrlCenterX - 28},${ctrlY - 7} ${ctrlCenterX - 28},${ctrlY + 7}" fill="${MUTED}" />\n`;

    // pause (two bars)
    svg += `  <rect x="${ctrlCenterX - 7}" y="${ctrlY - 9}" width="5" height="18" rx="1" fill="${FG}" />\n`;
    svg += `  <rect x="${ctrlCenterX + 2}" y="${ctrlY - 9}" width="5" height="18" rx="1" fill="${FG}" />\n`;

    // next
    svg += `  <polygon points="${ctrlCenterX + 18},${ctrlY} ${ctrlCenterX + 30},${ctrlY - 7} ${ctrlCenterX + 30},${ctrlY + 7}" fill="${MUTED}" />\n`;
    svg += `  <polygon points="${ctrlCenterX + 28},${ctrlY} ${ctrlCenterX + 40},${ctrlY - 7} ${ctrlCenterX + 40},${ctrlY + 7}" fill="${MUTED}" />\n`;

    // equalizer bars (컨트롤 오른쪽)
    const eqX = width - pad - 28;
    svg += `  <rect x="${eqX}" width="4" rx="1" fill="${ACCENT}" class="eq1" />\n`;
    svg += `  <rect x="${eqX + 7}" width="4" rx="1" fill="${ACCENT}" class="eq2" />\n`;
    svg += `  <rect x="${eqX + 14}" width="4" rx="1" fill="${ACCENT}" class="eq3" />\n`;
    svg += `  <rect x="${eqX + 21}" width="4" rx="1" fill="${ACCENT}" class="eq4" />\n`;

    // extra tracks list
    if (extraTracks.length > 0) {
      let trackY = baseHeight;
      svg += `  <line x1="${pad}" y1="${trackY}" x2="${width - pad}" y2="${trackY}" stroke="#333" stroke-width="1" />\n`;

      for (let i = 0; i < extraTracks.length; i++) {
        const t = extraTracks[i];
        const rowY = trackY + EXTRA_TRACK_HEIGHT / 2;
        svg += `  <text x="${pad + 12}" y="${rowY + 4}" font-size="12" fill="${MUTED}" font-family="${FONT}">${i + 2}</text>\n`;
        svg += `  <text x="${pad + 32}" y="${rowY + 4}" font-size="13" fill="${FG}" font-family="${FONT}">${esc(truncate(t.title, 30))}</text>\n`;
        svg += `  <text x="${width - pad}" y="${rowY + 4}" font-size="11" fill="${MUTED}" font-family="${FONT}" text-anchor="end">${esc(truncate(t.channelName, 20))}</text>\n`;
        trackY += EXTRA_TRACK_HEIGHT;
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${svg}</svg>`;
  },
};
