import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc } from "./utils";

const BG = "#1e1e1e";
const TITLE_BAR = "#2d2d2d";
const GREEN = "#4ec9b0";
const BLUE = "#569cd6";
const ORANGE = "#ce9178";
const WHITE = "#d4d4d4";
const GRAY = "#6a6a6a";
const FONT = "Menlo, 'Cascadia Code', Consolas, monospace";
const EXTRA_TRACK_HEIGHT = 52;

export const terminalTemplate: Template = {
  meta: {
    id: "terminal",
    displayName: "Terminal",
    description: "터미널 창 스타일 카드",
    category: "developer",
    supportsLayout: false,
    supportsMultiTrack: true,
    supportsTags: false,
    supportsLabel: false,
    maxTracks: 5,
    variants: [],
    previewDimensions: { width: 480, height: 178 },
  },

  render(options: TemplateRenderOptions): string {
    const { track, tracks } = options;
    const width = 480;
    const isMulti = tracks.length > 1;
    const extraTracks = tracks.slice(1);
    const baseHeight = 178;
    const height = baseHeight + extraTracks.length * EXTRA_TRACK_HEIGHT;

    const pad = 20;
    const titleBarH = 36;
    const fontSize = 13;
    const lineH = 20;

    let svg = "";

    // defs (cursor blink)
    svg += `  <defs>\n`;
    svg += `    <style>\n`;
    svg += `      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }\n`;
    svg += `      .cursor { animation: blink 1s step-end infinite; }\n`;
    svg += `    </style>\n`;
    svg += `  </defs>\n`;

    // card bg
    svg += `  <rect width="${width}" height="${height}" rx="10" fill="${BG}" />\n`;

    // title bar
    svg += `  <rect width="${width}" height="${titleBarH}" rx="10" fill="${TITLE_BAR}" />\n`;
    svg += `  <rect y="${titleBarH - 10}" width="${width}" height="10" fill="${TITLE_BAR}" />\n`;

    // traffic lights
    const lightY = titleBarH / 2;
    svg += `  <circle cx="${pad}" cy="${lightY}" r="6" fill="#ff5f56" />\n`;
    svg += `  <circle cx="${pad + 20}" cy="${lightY}" r="6" fill="#ffbd2e" />\n`;
    svg += `  <circle cx="${pad + 40}" cy="${lightY}" r="6" fill="#27c93f" />\n`;

    // title text
    svg += `  <text x="${width / 2}" y="${lightY + 4}" font-size="12" fill="${GRAY}" text-anchor="middle" font-family="${FONT}">soundbadge \u2014 now-playing</text>\n`;

    // content area (title bar 아래 여유 여백)
    let y = titleBarH + pad + 8;

    if (!isMulti) {
      // single track mode
      // $ now-playing
      svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" font-family="${FONT}">`;
      svg += `<tspan fill="${GREEN}">$ </tspan>`;
      svg += `<tspan fill="${WHITE}">now-playing</tspan>`;
      svg += `</text>\n`;
      y += lineH;

      // output
      svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" fill="${BLUE}" font-family="${FONT}">\u266B ${esc(truncate(track.title, 48))}</text>\n`;
      y += lineH;

      svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" fill="${ORANGE}" font-family="${FONT}">  by ${esc(truncate(track.channelName, 40))}</text>\n`;
      y += lineH;

      svg += `  <text x="${pad}" y="${y}" font-size="11" fill="${GRAY}" font-family="${FONT}">${esc(truncate(track.sourceUrl, 55))}</text>\n`;
      y += lineH + 4;

      // prompt with cursor
      svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" font-family="${FONT}">`;
      svg += `<tspan fill="${GREEN}">$ </tspan>`;
      svg += `<tspan fill="${WHITE}" class="cursor">_</tspan>`;
      svg += `</text>\n`;
    } else {
      // multi track mode: $ now-playing --list
      svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" font-family="${FONT}">`;
      svg += `<tspan fill="${GREEN}">$ </tspan>`;
      svg += `<tspan fill="${WHITE}">now-playing </tspan>`;
      svg += `<tspan fill="${ORANGE}">--list</tspan>`;
      svg += `</text>\n`;
      y += lineH + 4;

      // track list
      for (let i = 0; i < tracks.length; i++) {
        const t = tracks[i];
        const idx = String(i + 1).padStart(2, " ");
        svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" font-family="${FONT}">`;
        svg += `<tspan fill="${GRAY}">${idx}. </tspan>`;
        svg += `<tspan fill="${BLUE}">${esc(truncate(t.title, 32))}</tspan>`;
        svg += `<tspan fill="${GRAY}"> \u2014 </tspan>`;
        svg += `<tspan fill="${ORANGE}">${esc(truncate(t.channelName, 18))}</tspan>`;
        svg += `</text>\n`;
        y += lineH;

        if (i < tracks.length - 1) {
          y += 4;
        }
      }

      y += 8;

      // prompt with cursor
      svg += `  <text x="${pad}" y="${y}" font-size="${fontSize}" font-family="${FONT}">`;
      svg += `<tspan fill="${GREEN}">$ </tspan>`;
      svg += `<tspan fill="${WHITE}" class="cursor">_</tspan>`;
      svg += `</text>\n`;
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
${svg}</svg>`;
  },
};
