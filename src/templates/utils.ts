export async function fetchImageAsBase64(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1) + "\u2026";
}

/** CJK 문자를 고려한 텍스트 폭 추정 (CJK는 1.7배) */
export function estimateTextWidth(text: string, fontSize: number, charWidthRatio = 0.55): number {
  let units = 0;
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    const isCJK =
      (code >= 0x1100 && code <= 0x11ff) ||   // 한글 자모
      (code >= 0x3000 && code <= 0x9fff) ||   // CJK 통합
      (code >= 0xac00 && code <= 0xd7af) ||   // 한글 음절
      (code >= 0xf900 && code <= 0xfaff) ||   // CJK 호환
      (code >= 0xff00 && code <= 0xffef);     // 전각
    units += isCJK ? 1.7 : 1;
  }
  return units * fontSize * charWidthRatio;
}

/** 주어진 폭에 맞게 텍스트를 잘라내는 truncate */
export function truncateToFit(text: string, maxWidth: number, fontSize: number, charWidthRatio = 0.55): string {
  if (estimateTextWidth(text, fontSize, charWidthRatio) <= maxWidth) return text;
  for (let i = text.length - 1; i > 0; i--) {
    const t = text.slice(0, i) + "\u2026";
    if (estimateTextWidth(t, fontSize, charWidthRatio) <= maxWidth) return t;
  }
  return "\u2026";
}

export function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
