export interface YouTubeMetadata {
  title: string;
  channelName: string;
  thumbnailUrl: string;
}

export async function fetchVideoMetadata(videoId: string): Promise<YouTubeMetadata> {
  // TODO: YouTube Data API v3 연동
  return {
    title: `Video ${videoId}`,
    channelName: "Channel",
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  };
}

export async function fetchPlaylistMetadata(playlistId: string): Promise<YouTubeMetadata> {
  // TODO: YouTube Data API v3 연동
  return {
    title: `Playlist ${playlistId}`,
    channelName: "Channel",
    thumbnailUrl: "",
  };
}
