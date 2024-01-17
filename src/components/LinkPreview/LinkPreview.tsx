import { useState, useEffect } from "react";
import {
  extractYouTubeVideoId,
  isYouTubeURL,
  type NormalLink,
  type YouTubeLink,
} from ".";

interface LinkPreviewProps {
  url: string;
}

function LinkPreview({ url }: LinkPreviewProps) {
  const [previewData, setPreviewData] = useState<
    NormalLink | YouTubeLink | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        const data = await response.text();

        const isYouTubeVideo = isYouTubeURL(url);

        if (isYouTubeVideo) {
          const videoId = extractYouTubeVideoId(url);
          const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

          setPreviewData({
            videoId,
            videoThumbnail,
          });

          setLoading(false);
        } else {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");
          const title = doc.querySelector("title")?.textContent || "";
          const description =
            doc
              .querySelector('meta[name="description"]')
              ?.getAttribute("content") || "";
          let image =
            doc
              .querySelector('meta[property="og:image"]')
              ?.getAttribute("content") || "";

          if (!image.startsWith("http")) {
            image = url + image;
          }

          setPreviewData({
            title,
            description,
            image,
          });

          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!previewData) {
    return <p>Failed to fetch link preview.</p>;
  }

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer" }}>
      <div>hello</div>
    </div>
  );
}

export default LinkPreview;
