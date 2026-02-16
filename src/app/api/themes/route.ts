import { NextResponse } from "next/server";
import { THEMES } from "@/themes";

export const runtime = "edge";

export async function GET() {
  const themeList = Object.values(THEMES).map((t) => ({
    name: t.name,
    label: t.label,
    tokens: t.tokens,
  }));

  return NextResponse.json(themeList);
}
