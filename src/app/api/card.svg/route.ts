import { type NextRequest, NextResponse } from "next/server";
import { renderCardSvg } from "@/lib/card-renderer";
import { getTheme } from "@/themes";
import { LAYOUTS } from "@/layouts/types";
import type { LayoutName } from "@/layouts/types";
import { getCacheHeaders } from "@/lib/cache";
import { isTemplateTheme, resolveTemplate } from "@/templates";
import { resolveTracks } from "@/lib/track-resolver";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const urls = searchParams.getAll("url");
  const themeName = searchParams.get("theme") ?? "minimal";
  const layoutName = (searchParams.get("layout") ?? "regular") as LayoutName;
  const tags = searchParams.get("tags")?.split(",").slice(0, 3);
  const label = searchParams.get("label") ?? undefined;
  const variant = searchParams.get("variant") ?? undefined;

  if (urls.length === 0) {
    return new NextResponse("Missing `url` parameter", { status: 400 });
  }

  try {
    // 공통: 트랙 resolve (싱글/멀티 동일 경로)
    const tracks = await resolveTracks(urls);

    if (tracks.length === 0) {
      return new NextResponse("Invalid YouTube URL", { status: 400 });
    }

    // 새 템플릿 경로
    if (isTemplateTheme(themeName)) {
      const template = resolveTemplate(themeName)!;

      const svg = template.render({
        track: tracks[0],
        tracks,
        layout: layoutName,
        tags,
        label,
        variant,
      });

      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          ...getCacheHeaders(),
        },
      });
    }

    // 클래식 테마 경로 (첫 번째 트랙만 사용)
    const track = tracks[0];
    const classicThemeName = themeName === "neon-legacy" ? "neon" : themeName;
    const theme = getTheme(classicThemeName);
    const layout = LAYOUTS[layoutName] ?? LAYOUTS.regular;

    const svg = await renderCardSvg({
      theme,
      layout,
      metadata: {
        title: track.title,
        channelName: track.channelName,
        thumbnailUrl: track.thumbnailUrl,
      },
      tags,
      label,
    });

    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        ...getCacheHeaders(),
      },
    });
  } catch {
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="120" viewBox="0 0 420 120">
  <rect width="420" height="120" rx="12" fill="#1a1a1a" />
  <text x="210" y="55" font-size="16" fill="#e5e5e5" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="bold">SoundBadge</text>
  <text x="210" y="78" font-size="12" fill="#737373" text-anchor="middle" font-family="system-ui, sans-serif">카드를 불러올 수 없습니다</text>
</svg>`;
    return new NextResponse(fallbackSvg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=60",
      },
    });
  }
}
