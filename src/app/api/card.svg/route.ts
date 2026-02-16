import { type NextRequest, NextResponse } from "next/server";
import { parseYouTubeUrl } from "@/lib/url-parser";
import { fetchVideoMetadata, fetchPlaylistMetadata } from "@/lib/youtube";
import { renderCardSvg } from "@/lib/card-renderer";
import { getTheme } from "@/themes";
import { LAYOUTS } from "@/layouts/types";
import type { LayoutName } from "@/layouts/types";
import { getCacheHeaders } from "@/lib/cache";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const url = searchParams.get("url");
  const themeName = searchParams.get("theme") ?? "minimal";
  const layoutName = (searchParams.get("layout") ?? "regular") as LayoutName;
  const tags = searchParams.get("tags")?.split(",").slice(0, 3);
  const label = searchParams.get("label") ?? undefined;

  if (!url) {
    return new NextResponse("Missing `url` parameter", { status: 400 });
  }

  const parsed = parseYouTubeUrl(url);
  if (!parsed) {
    return new NextResponse("Invalid YouTube URL", { status: 400 });
  }

  const metadata =
    parsed.type === "video"
      ? await fetchVideoMetadata(parsed.id)
      : await fetchPlaylistMetadata(parsed.id);

  const theme = getTheme(themeName);
  const layout = LAYOUTS[layoutName] ?? LAYOUTS.regular;

  const svg = renderCardSvg({ theme, layout, metadata, tags, label });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      ...getCacheHeaders(),
    },
  });
}
