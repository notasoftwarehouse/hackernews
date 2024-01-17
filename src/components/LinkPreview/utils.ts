export const isYouTubeURL = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

export const extractYouTubeVideoId = (url: string) => {
  const videoIdRegex =
    /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : "";
};
