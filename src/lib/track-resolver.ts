import { parseYouTubeUrl } from "./url-parser";
import {
  fetchVideoMetadata,
  fetchPlaylistMetadata,
  fetchMultipleVideoMetadata,
} from "./youtube";
import { fetchImageAsBase64 } from "@/templates/utils";
import type { TrackData } from "@/templates/types";

const MAX_TRACKS = 5;

export async function resolveTracks(urls: string[]): Promise<TrackData[]> {
  const unique = [...new Set(urls)].slice(0, MAX_TRACKS);

  const parsed = unique
    .map((u) => ({ url: u, result: parseYouTubeUrl(u) }))
    .filter((p) => p.result !== null) as {
    url: string;
    result: { type: "video" | "playlist"; id: string };
  }[];

  if (parsed.length === 0) return [];

  const videoEntries = parsed.filter((p) => p.result.type === "video");
  const playlistEntries = parsed.filter((p) => p.result.type === "playlist");

  // 비디오 배치 fetch
  const videoIds = videoEntries.map((e) => e.result.id);
  const videoMetaMap =
    videoIds.length > 0
      ? await fetchMultipleVideoMetadata(videoIds)
      : new Map<string, Awaited<ReturnType<typeof fetchVideoMetadata>>>();

  // 플레이리스트 개별 fetch (병렬)
  const playlistMetas = await Promise.all(
    playlistEntries.map(async (e) => ({
      id: e.result.id,
      url: e.url,
      meta: await fetchPlaylistMetadata(e.result.id),
    })),
  );

  // 원본 순서 유지하며 TrackData 조립
  const tracks: {
    url: string;
    title: string;
    channelName: string;
    thumbnailUrl: string;
  }[] = [];

  for (const p of parsed) {
    if (p.result.type === "video") {
      const meta = videoMetaMap.get(p.result.id);
      if (meta) {
        tracks.push({ url: p.url, ...meta });
      }
    } else {
      const found = playlistMetas.find((m) => m.id === p.result.id);
      if (found) {
        tracks.push({ url: found.url, ...found.meta });
      }
    }
  }

  // 썸네일 병렬 fetch
  const trackDataList: TrackData[] = await Promise.all(
    tracks.map(async (t) => ({
      title: t.title,
      channelName: t.channelName,
      thumbnailUrl: t.thumbnailUrl,
      thumbnailBase64: await fetchImageAsBase64(t.thumbnailUrl),
      sourceUrl: t.url,
    })),
  );

  return trackDataList;
}
