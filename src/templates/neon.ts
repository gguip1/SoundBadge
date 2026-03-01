import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc } from "./utils";

const VARIANTS: Record<string, { glow: string; bg: string }> = {
  green: { glow: "#00ff88", bg: "#0a0f0a" },
  pink: { glow: "#ff00ff", bg: "#0f0a0f" },
  cyan: { glow: "#00ffff", bg: "#0a0f0f" },
};

const FONT = "'Segoe UI', system-ui, sans-serif";
const EXTRA_TRACK_HEIGHT = 60;
const TITLE_FONT_SIZE = 18;
const TITLE_CHAR_WIDTH = TITLE_FONT_SIZE * 0.58;
const TITLE_MAX_CHARS = 26;
const MARQUEE_GAP = 80;
const MARQUEE_SPEED = 50;

export const neonTemplate: Template = {
  meta: {
    id: "neon",
    displayName: "Neon",
    description: "네온 글로우 효과 카드",
    category: "visual",
    supportsLayout: false,
    supportsMultiTrack: true,
    supportsTags: false,
    supportsLabel: false,
    maxTracks: 5,
    variants: Object.keys(VARIANTS),
    previewDimensions: { width: 480, height: 180 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, tracks, variant } = options;
    const colors = VARIANTS[variant ?? "green"] ?? VARIANTS.green;
    const glow = colors.glow;
    const bg = colors.bg;

    const width = 480;
    const baseHeight = 180;
    const extraTracks = tracks.slice(1);
    const height = baseHeight + extraTracks.length * EXTRA_TRACK_HEIGHT;

    const pad = 24;
    const thumbSize = 96;
    const thumbX = pad;
    const thumbY = Math.round((baseHeight - thumbSize) / 2);
    const thumbRadius = 8;
    const textX = thumbX + thumbSize + pad;
    const textMaxWidth = width - textX - pad;

    const titleNeedsScroll = track.title.length > TITLE_MAX_CHARS;
    const titleText = titleNeedsScroll ? track.title : truncate(track.title, TITLE_MAX_CHARS);
    const titleFullWidth = track.title.length * TITLE_CHAR_WIDTH;
    const titleOverflow = titleFullWidth - textMaxWidth;

    const titleY = thumbY + 28;

    let svg = "";

    // defs: glow filters + grid pattern + pulse + marquee animation
    svg += `  <defs>\n`;
    svg += `    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">\n`;
    svg += `      <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />\n`;
    svg += `      <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>\n`;
    svg += `    </filter>\n`;
    svg += `    <filter id="glowLight" x="-50%" y="-50%" width="200%" height="200%">\n`;
    svg += `      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />\n`;
    svg += `      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>\n`;
    svg += `    </filter>\n`;
    svg += `    <clipPath id="thumbClip"><rect x="${thumbX}" y="${thumbY}" width="${thumbSize}" height="${thumbSize}" rx="${thumbRadius}" /></clipPath>\n`;

    if (titleNeedsScroll) {
      svg += `    <clipPath id="titleClip"><rect x="${textX}" y="${titleY - 20}" width="${textMaxWidth}" height="30" /></clipPath>\n`;
    }

    svg += `    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">\n`;
    svg += `      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="${glow}" stroke-width="0.3" opacity="0.2" />\n`;
    svg += `    </pattern>\n`;
    svg += `    <style>\n`;
    svg += `      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}\n`;
    svg += `      .neon-pulse{animation:pulse 3s ease-in-out infinite}\n`;

    if (titleNeedsScroll) {
      const loopDist = Math.ceil(titleFullWidth + MARQUEE_GAP);
      const duration = Math.max(4, loopDist / MARQUEE_SPEED);
      svg += `      @keyframes neonScroll{0%{transform:translateX(0)}100%{transform:translateX(-${loopDist}px)}}\n`;
      svg += `      .neon-marquee{animation:neonScroll ${duration.toFixed(1)}s linear infinite}\n`;
    }

    svg += `    </style>\n`;
    svg += `  </defs>\n`;

    // background
    svg += `  <rect width="${width}" height="${height}" rx="16" fill="${bg}" />\n`;

    // grid pattern
    svg += `  <rect width="${width}" height="${height}" rx="16" fill="url(#grid)" />\n`;

    // glow border
    svg += `  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="15" fill="none" stroke="${glow}" stroke-width="1.5" filter="url(#glow)" class="neon-pulse" />\n`;

    // thumbnail with glow shadow
    if (track.thumbnailBase64) {
      svg += `  <rect x="${thumbX - 2}" y="${thumbY - 2}" width="${thumbSize + 4}" height="${thumbSize + 4}" rx="${thumbRadius + 2}" fill="none" stroke="${glow}" stroke-width="1" filter="url(#glowLight)" opacity="0.6" />\n`;
      svg += `  <image href="${track.thumbnailBase64}" x="${thumbX}" y="${thumbY}" width="${thumbSize}" height="${thumbSize}" clip-path="url(#thumbClip)" preserveAspectRatio="xMidYMid slice" />\n`;
    } else {
      svg += `  <rect x="${thumbX}" y="${thumbY}" width="${thumbSize}" height="${thumbSize}" rx="${thumbRadius}" fill="${glow}" opacity="0.1" />\n`;
      svg += `  <text x="${thumbX + thumbSize / 2}" y="${thumbY + thumbSize / 2 + 10}" font-size="32" fill="${glow}" text-anchor="middle" font-family="system-ui" filter="url(#glowLight)">&#9835;</text>\n`;
    }

    // title (neon glow + continuous marquee if needed)
    if (titleNeedsScroll) {
      const loopDist = Math.ceil(titleFullWidth + MARQUEE_GAP);
      const secondX = textX + loopDist;
      svg += `  <g clip-path="url(#titleClip)">\n`;
      svg += `    <g class="neon-marquee">\n`;
      svg += `      <text x="${textX}" y="${titleY}" font-size="${TITLE_FONT_SIZE}" fill="${glow}" font-family="${FONT}" font-weight="bold" filter="url(#glowLight)">${esc(track.title)}</text>\n`;
      svg += `      <text x="${secondX}" y="${titleY}" font-size="${TITLE_FONT_SIZE}" fill="${glow}" font-family="${FONT}" font-weight="bold" filter="url(#glowLight)">${esc(track.title)}</text>\n`;
      svg += `    </g>\n`;
      svg += `  </g>\n`;
    } else {
      svg += `  <text x="${textX}" y="${titleY}" font-size="${TITLE_FONT_SIZE}" fill="${glow}" font-family="${FONT}" font-weight="bold" filter="url(#glowLight)" class="neon-pulse">${esc(titleText)}</text>\n`;
    }

    // channel
    svg += `  <text x="${textX}" y="${titleY + 26}" font-size="13" fill="${glow}" opacity="0.6" font-family="${FONT}">${esc(truncate(track.channelName, 30))}</text>\n`;

    // now playing indicator
    svg += `  <text x="${textX}" y="${titleY + 52}" font-size="11" fill="${glow}" opacity="0.4" font-family="${FONT}" letter-spacing="2">\u25B6 NOW PLAYING</text>\n`;

    // extra tracks
    if (extraTracks.length > 0) {
      let trackY = baseHeight;
      svg += `  <line x1="${pad}" y1="${trackY}" x2="${width - pad}" y2="${trackY}" stroke="${glow}" stroke-width="0.5" opacity="0.2" />\n`;

      for (const t of extraTracks) {
        const rowCenterY = trackY + EXTRA_TRACK_HEIGHT / 2;
        svg += `  <text x="${pad + 12}" y="${rowCenterY - 4}" font-size="14" fill="${glow}" font-family="${FONT}" filter="url(#glowLight)" opacity="0.9">${esc(truncate(t.title, 32))}</text>\n`;
        svg += `  <text x="${pad + 12}" y="${rowCenterY + 16}" font-size="11" fill="${glow}" font-family="${FONT}" opacity="0.4">${esc(truncate(t.channelName, 35))}</text>\n`;
        trackY += EXTRA_TRACK_HEIGHT;
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${svg}</svg>`;
  },
};
