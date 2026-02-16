import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc } from "./utils";

const VARIANTS: Record<string, { left: string; text: string }> = {
  blue: { left: "#007ec6", text: "#fff" },
  green: { left: "#4c1", text: "#fff" },
  red: { left: "#e05d44", text: "#fff" },
  purple: { left: "#9f44d3", text: "#fff" },
  orange: { left: "#fe7d37", text: "#fff" },
};

const CHAR_WIDTH = 6.5;
const MAX_RIGHT_DISPLAY_CHARS = 40;

export const badgeTemplate: Template = {
  meta: {
    id: "badge",
    displayName: "Badge",
    description: "shields.io 스타일 인라인 배지",
    category: "simple",
    supportsLayout: false,
    supportsMultiTrack: false,
    maxTracks: 1,
    variants: Object.keys(VARIANTS),
    previewDimensions: { width: 300, height: 28 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, variant } = options;
    const colors = VARIANTS[variant ?? "blue"] ?? VARIANTS.blue;

    const leftLabel = "\u266A Now Playing";
    const fullRight = `${track.title} - ${track.channelName}`;
    const needsScroll = fullRight.length > MAX_RIGHT_DISPLAY_CHARS;

    const leftPad = 8;
    const rightPad = 8;
    const leftWidth = leftLabel.length * CHAR_WIDTH + leftPad * 2;

    // 스크롤 시 표시 영역은 고정, 아닐 때는 텍스트 길이에 맞춤
    const displayChars = needsScroll ? MAX_RIGHT_DISPLAY_CHARS : fullRight.length;
    const rightWidth = displayChars * CHAR_WIDTH + rightPad * 2;
    const totalWidth = leftWidth + rightWidth;
    const height = 28;
    const radius = 4;

    const rightLabel = needsScroll ? fullRight : truncate(fullRight, 50);
    const fullTextWidth = fullRight.length * CHAR_WIDTH;
    const overflow = fullTextWidth - (rightWidth - rightPad * 2);

    let defs = `    <clipPath id="badgeClip"><rect width="${totalWidth}" height="${height}" rx="${radius}" /></clipPath>\n`;
    let style = "";

    if (needsScroll) {
      // 양쪽 rightPad만큼 여백 확보
      defs += `    <clipPath id="rightClip"><rect x="${leftWidth + rightPad}" y="0" width="${rightWidth - rightPad * 2}" height="${height}" /></clipPath>\n`;
      style = `    <style>
      @keyframes badgeScroll{0%,15%{transform:translateX(0)}85%,100%{transform:translateX(-${Math.ceil(overflow + rightPad)}px)}}
      .badge-marquee{animation:badgeScroll 8s ease-in-out infinite alternate}
    </style>\n`;
    }

    let rightText: string;
    if (needsScroll) {
      rightText = `  <g clip-path="url(#rightClip)">
    <text x="${leftWidth + rightPad}" y="${height / 2 + 4}" fill="#fff" class="badge-marquee">${esc(rightLabel)}</text>
  </g>`;
    } else {
      rightText = `    <text x="${leftWidth + rightWidth / 2}" y="${height / 2 + 4}" text-anchor="middle" fill="#fff">${esc(rightLabel)}</text>`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" viewBox="0 0 ${totalWidth} ${height}">
  <defs>
${defs}${style}  </defs>
  <g clip-path="url(#badgeClip)">
    <rect width="${leftWidth}" height="${height}" fill="${colors.left}" />
    <rect x="${leftWidth}" width="${rightWidth}" height="${height}" fill="#555" />
  </g>
  <g font-family="Verdana, Geneva, DejaVu Sans, sans-serif" font-size="11" fill="${colors.text}">
    <text x="${leftWidth / 2}" y="${height / 2 + 4}" text-anchor="middle">${esc(leftLabel)}</text>
${rightText}
  </g>
</svg>`;
  },
};
