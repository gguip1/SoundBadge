import type { Template, TemplateRenderOptions } from "./types";
import { truncate, esc, estimateTextWidth, truncateToFit } from "./utils";

const VARIANTS: Record<string, { bg: string; text: string; muted: string; border: string }> = {
    receipt: {
        bg: "#fdfbf7",
        text: "#1a1a1a",
        muted: "#5a5a5a",
        border: "#dbd7cc",
    },
    dark_ticket: {
        bg: "#111111",
        text: "#f0f0f0",
        muted: "#a0a0a0",
        border: "#333333",
    },
};

export const receiptTemplate: Template = {
    meta: {
        id: "receipt",
        displayName: "Receipt",
        description: "영수증 / 티켓 형태의 세로형 다중 트랙 디자인",
        category: "visual",
        supportsLayout: false,
        supportsMultiTrack: true,
        supportsTags: false,
        supportsLabel: true,
        maxTracks: 5,
        variants: Object.keys(VARIANTS),
        previewDimensions: { width: 340, height: 400 }, // Variable height, but preview size
    },

    render(options: TemplateRenderOptions): string {
        const { tracks, variant, label } = options;
        const colors = VARIANTS[variant ?? "receipt"] ?? VARIANTS.receipt;

        const width = 340;
        const padding = 24;
        const headerHeight = 80;
        const trackHeight = 60;
        const footerHeight = 100;

        const height = headerHeight + (tracks.length * trackHeight) + footerHeight;

        const font = "'Courier New', Courier, monospace";
        const rawTitle = label || "SOUNDBADGE STORE";
        const maxLabelWidth = width - padding * 2;
        // 라벨이 길면 폰트 축소, 그래도 넘으면 truncate
        let titleFontSize = 20;
        if (estimateTextWidth(rawTitle, titleFontSize, 0.6) > maxLabelWidth) {
            titleFontSize = 16;
        }
        if (estimateTextWidth(rawTitle, titleFontSize, 0.6) > maxLabelWidth) {
            titleFontSize = 13;
        }
        const maxTitleChars = Math.floor(maxLabelWidth / (titleFontSize * 0.6));
        const titleText = truncate(rawTitle, maxTitleChars);
        const date = new Date().toISOString().split('T')[0];

        // 다각형 테두리(지그재그) 계산 로직
        const zigzagSize = 6;
        let topZigzag = `0,${zigzagSize} `;
        let bottomZigzag = `0,${height - zigzagSize} `;

        for (let x = 0; x <= width; x += zigzagSize * 2) {
            topZigzag += `${x},0 ${x + zigzagSize},${zigzagSize} `;
            bottomZigzag += `${x},${height} ${x + zigzagSize},${height - zigzagSize} `;
        }
        topZigzag += `${width},0 `;

        const polygonPoints = `0,${zigzagSize} ${topZigzag} ${width},${height - zigzagSize} ${bottomZigzag} 0,${height - zigzagSize}`;

        // 바코드 렌더링
        let barcodeLines = "";
        // 더미 데이터 생성을 위한 시드
        let barcodeX = padding;
        const barcodeWidth = width - padding * 2;
        while (barcodeX < padding + barcodeWidth) {
            const lineW = Math.random() > 0.6 ? 4 : (Math.random() > 0.5 ? 2 : 1);
            const gap = Math.random() > 0.5 ? 2 : 4;
            if (barcodeX + lineW <= padding + barcodeWidth) {
                barcodeLines += `<rect x="${barcodeX}" y="${height - 60}" width="${lineW}" height="40" fill="${colors.text}" />\n`;
            }
            barcodeX += lineW + gap;
        }

        let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="receipt-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.15" />
    </filter>
    <style>
      .r-font { font-family: ${font}; fill: ${colors.text}; }
      .r-title { font-size: 20px; font-weight: bold; text-anchor: middle; letter-spacing: 2px; }
      .r-date { font-size: 11px; fill: ${colors.muted}; text-anchor: middle; }
      .r-bold { font-weight: bold; font-size: 13px; }
      .r-sub { font-size: 11px; fill: ${colors.muted}; }
      .dash-line { stroke: ${colors.border}; stroke-width: 1.5; stroke-dasharray: 4 4; fill: none; }
    </style>
  </defs>

  <!-- Background Paper with Zigzag -->
  <polygon points="${polygonPoints}" fill="${colors.bg}" filter="url(#receipt-shadow)" />

  <!-- Header -->
  <text x="${width / 2}" y="${padding + 16}" class="r-font" font-size="${titleFontSize}" font-weight="bold" text-anchor="middle" letter-spacing="2px">${esc(titleText)}</text>
  <text x="${width / 2}" y="${padding + 34}" class="r-font r-date">${date} • RECEIPT</text>
  
  <line x1="${padding}" y1="${headerHeight}" x2="${width - padding}" y2="${headerHeight}" class="dash-line" />
  
  <!-- Tracks List -->
  <g transform="translate(0, ${headerHeight + 10})">
`;

        // Tracks Render
        const titleFontSizeTrack = 13;  // r-bold font-size
        const subFontSize = 11;         // r-sub font-size
        const priceWidth = 40;          // "1.00" 텍스트 여유 공간
        const numWidth = 24;            // 번호(01, 02) 공간
        const maxTrackTitleWidth = width - padding * 2 - numWidth - priceWidth;
        const maxChannelWidth = width - padding * 2 - numWidth;

        tracks.forEach((track, index) => {
            const y = index * trackHeight;
            const numStr = (index + 1).toString().padStart(2, "0");
            const titleText = truncateToFit(track.title, maxTrackTitleWidth, titleFontSizeTrack, 0.6);
            const channelText = truncateToFit(track.channelName, maxChannelWidth, subFontSize, 0.6);
            svg += `
    <text x="${padding}" y="${y + 16}" class="r-font r-bold">${numStr}</text>
    <text x="${padding + 24}" y="${y + 16}" class="r-font r-bold">${esc(titleText)}</text>
    <text x="${padding + 24}" y="${y + 34}" class="r-font r-sub">${esc(channelText)}</text>
    <text x="${width - padding}" y="${y + 16}" class="r-font r-bold" text-anchor="end">1.00</text>
`;
        });

        // Footer
        const footerY = headerHeight + (tracks.length * trackHeight) + 10;

        svg += `
  </g>
  
  <line x1="${padding}" y1="${footerY}" x2="${width - padding}" y2="${footerY}" class="dash-line" />
  
  <!-- Total -->
  <text x="${padding}" y="${footerY + 24}" class="r-font r-bold" font-size="14">TOTAL TRACKS</text>
  <text x="${width - padding}" y="${footerY + 24}" class="r-font r-bold" font-size="14" text-anchor="end">${tracks.length}</text>
  
  <!-- Barcode -->
  <g opacity="0.85">
    ${barcodeLines}
  </g>
  <text x="${width / 2}" y="${height - 8}" class="r-font" font-size="9" text-anchor="middle" letter-spacing="4px">THANK YOU</text>

</svg>`;

        return svg;
    },
};
