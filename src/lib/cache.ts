/** 캐시 관련 유틸리티 (향후 구현) */

export function getCacheHeaders(maxAge: number = 3600): HeadersInit {
  return {
    "Cache-Control": `public, max-age=${maxAge}, s-maxage=${maxAge * 24}`,
  };
}
