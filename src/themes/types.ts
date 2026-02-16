export type ThemeName =
  | "minimal"
  | "mono"
  | "neon"
  | "pastel"
  | "sunset"
  | "midnight"
  | "glass"
  | "retro";

export type Pattern = "none" | "noise" | "grid" | "dots";

export interface ThemeTokens {
  /** 배경 (단색 또는 CSS 그라데이션) */
  bg: string;
  /** 메인 텍스트 색상 */
  fg: string;
  /** 서브 텍스트 색상 */
  muted: string;
  /** 포인트 색상 (라인/배지/바) */
  accent: string;
  /** 테두리 색상 (없으면 "none") */
  border: string;
  /** 그림자 (CSS box-shadow 값 또는 "none") */
  shadow: string;
  /** 카드 라운드 (px) */
  radius: number;
  /** 배경 패턴 */
  pattern: Pattern;
}

export interface Theme {
  name: ThemeName;
  label: string;
  tokens: ThemeTokens;
}
