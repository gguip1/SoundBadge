import type { Template, TemplateMeta } from "./types";
import { badgeTemplate } from "./badge";
import { cleanTemplate } from "./clean";
import { streamTemplate } from "./stream";
import { terminalTemplate } from "./terminal";
import { neonTemplate } from "./neon";
import { receiptTemplate } from "./receipt";

const TEMPLATES: Record<string, Template> = {
  badge: badgeTemplate,
  clean: cleanTemplate,
  stream: streamTemplate,
  terminal: terminalTemplate,
  neon: neonTemplate,
  receipt: receiptTemplate,
};

/** 기존 테마 이름 (card-renderer.ts 경유) */
const CLASSIC_THEMES = new Set([
  "minimal",
  "mono",
  "neon-legacy",
  "pastel",
  "sunset",
  "midnight",
  "glass",
  "retro",
]);

export function isTemplateTheme(name: string): boolean {
  return name in TEMPLATES;
}

export function isClassicTheme(name: string): boolean {
  return CLASSIC_THEMES.has(name);
}

export function resolveTemplate(name: string): Template | null {
  return TEMPLATES[name] ?? null;
}

export function getAllTemplateMetas(): TemplateMeta[] {
  return Object.values(TEMPLATES).map((t) => t.meta);
}

export { TEMPLATES };
