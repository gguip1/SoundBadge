export interface ParsedYouTubeUrl {
  type: "video" | "playlist";
  id: string;
}

const YOUTUBE_HOSTS = ["youtube.com", "www.youtube.com", "youtu.be", "m.youtube.com"];

export function parseYouTubeUrl(urlString: string): ParsedYouTubeUrl | null {
  try {
    const url = new URL(urlString);

    if (!YOUTUBE_HOSTS.includes(url.hostname)) {
      return null;
    }

    // Playlist: /playlist?list=PLAYLIST_ID
    const listId = url.searchParams.get("list");
    if (url.pathname === "/playlist" && listId) {
      return { type: "playlist", id: listId };
    }

    // Video: /watch?v=VIDEO_ID
    const videoId = url.searchParams.get("v");
    if (videoId) {
      return { type: "video", id: videoId };
    }

    // Short URL: youtu.be/VIDEO_ID
    if (url.hostname === "youtu.be" && url.pathname.length > 1) {
      return { type: "video", id: url.pathname.slice(1) };
    }

    return null;
  } catch {
    return null;
  }
}
