import { NextResponse } from "next/server";
import { THEMES } from "@/themes";
import { getAllTemplateMetas } from "@/templates";

export const runtime = "edge";

export async function GET() {
  const classicThemes = Object.values(THEMES).map((t) => ({
    type: "classic" as const,
    name: t.name,
    label: t.label,
    tokens: t.tokens,
  }));

  const templates = getAllTemplateMetas().map((m) => ({
    type: "template" as const,
    name: m.id,
    label: m.displayName,
    description: m.description,
    category: m.category,
    supportsMultiTrack: m.supportsMultiTrack,
    maxTracks: m.maxTracks,
    variants: m.variants,
    previewDimensions: m.previewDimensions,
  }));

  return NextResponse.json({ classic: classicThemes, templates });
}
