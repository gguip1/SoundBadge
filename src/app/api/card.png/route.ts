import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  // TODO: ImageResponse를 사용한 PNG 카드 생성 구현
  // import { ImageResponse } from "next/og";
  const { searchParams } = request.nextUrl;
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse("Missing `url` parameter", { status: 400 });
  }

  return new NextResponse("PNG generation coming soon", {
    status: 501,
    headers: { "Content-Type": "text/plain" },
  });
}
