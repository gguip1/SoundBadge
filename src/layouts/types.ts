export type LayoutName = "compact" | "regular" | "wide";

export interface LayoutConfig {
  name: LayoutName;
  /** 카드 전체 너비 (px) */
  width: number;
  /** 카드 전체 높이 (px) */
  height: number;
  /** 썸네일 크기 (px, 정사각형) */
  thumbnailSize: number;
  /** 제목 폰트 크기 (px) */
  titleSize: number;
  /** 서브타이틀 폰트 크기 (px) */
  subtitleSize: number;
  /** 내부 패딩 (px) */
  padding: number;
}

export const LAYOUTS: Record<LayoutName, LayoutConfig> = {
  compact: {
    name: "compact",
    width: 320,
    height: 80,
    thumbnailSize: 48,
    titleSize: 14,
    subtitleSize: 11,
    padding: 12,
  },
  regular: {
    name: "regular",
    width: 420,
    height: 120,
    thumbnailSize: 64,
    titleSize: 16,
    subtitleSize: 12,
    padding: 16,
  },
  wide: {
    name: "wide",
    width: 600,
    height: 160,
    thumbnailSize: 96,
    titleSize: 18,
    subtitleSize: 13,
    padding: 20,
  },
};
