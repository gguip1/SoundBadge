export interface YouTubeMetadata {
  title: string;
  channelName: string;
  thumbnailUrl: string;
}

const API_BASE = "https://www.googleapis.com/youtube/v3";

function getApiKey(): string {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error("YOUTUBE_API_KEY 환경 변수가 설정되지 않았습니다");
  }
  return key;
}

export async function fetchVideoMetadata(videoId: string): Promise<YouTubeMetadata> {
  const params = new URLSearchParams({
    part: "snippet",
    id: videoId,
    key: getApiKey(),
  });

  const res = await fetch(`${API_BASE}/videos?${params}`);
  if (!res.ok) {
    throw new Error(`YouTube API 오류: ${res.status}`);
  }

  const data = await res.json();
  const item = data.items?.[0];

  if (!item) {
    throw new Error(`영상을 찾을 수 없습니다: ${videoId}`);
  }

  const snippet = item.snippet;
  return {
    title: snippet.title,
    channelName: snippet.channelTitle,
    thumbnailUrl: snippet.thumbnails?.medium?.url
      ?? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  };
}

export async function fetchMultipleVideoMetadata(
  videoIds: string[],
): Promise<Map<string, YouTubeMetadata>> {
  if (videoIds.length === 0) return new Map();

  const params = new URLSearchParams({
    part: "snippet",
    id: videoIds.join(","),
    key: getApiKey(),
  });

  const res = await fetch(`${API_BASE}/videos?${params}`);
  if (!res.ok) {
    throw new Error(`YouTube API 오류: ${res.status}`);
  }

  const data = await res.json();
  const result = new Map<string, YouTubeMetadata>();

  for (const item of data.items ?? []) {
    const snippet = item.snippet;
    result.set(item.id, {
      title: snippet.title,
      channelName: snippet.channelTitle,
      thumbnailUrl:
        snippet.thumbnails?.medium?.url ??
        `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
    });
  }

  return result;
}

export async function fetchPlaylistMetadata(playlistId: string): Promise<YouTubeMetadata> {
  const params = new URLSearchParams({
    part: "snippet",
    id: playlistId,
    key: getApiKey(),
  });

  const res = await fetch(`${API_BASE}/playlists?${params}`);
  if (!res.ok) {
    throw new Error(`YouTube API 오류: ${res.status}`);
  }

  const data = await res.json();
  const item = data.items?.[0];

  if (!item) {
    throw new Error(`플레이리스트를 찾을 수 없습니다: ${playlistId}`);
  }

  const snippet = item.snippet;
  return {
    title: snippet.title,
    channelName: snippet.channelTitle,
    thumbnailUrl: snippet.thumbnails?.medium?.url ?? "",
  };
}
