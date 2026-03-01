import type { LayoutName } from "@/layouts/types";

export interface TrackData {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  thumbnailBase64: string | null;
  sourceUrl: string;
}

export interface TemplateRenderOptions {
  track: TrackData;
  tracks: TrackData[];
  layout: LayoutName;
  tags?: string[];
  label?: string;
  variant?: string;
}

export type TemplateCategory = "simple" | "player" | "visual" | "developer";

export interface TemplateMeta {
  id: string;
  displayName: string;
  description: string;
  category: TemplateCategory;
  supportsLayout: boolean;
  supportsMultiTrack: boolean;
  supportsTags: boolean;
  supportsLabel: boolean;
  maxTracks: number;
  variants: string[];
  previewDimensions: { width: number; height: number };
}

export interface Template {
  meta: TemplateMeta;
  render(options: TemplateRenderOptions): string;
}
