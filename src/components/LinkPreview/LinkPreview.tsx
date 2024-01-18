import { useState, useEffect } from "react";
import { getLinkPreview, type PreviewData } from ".";

interface LinkPreviewProps {
  url: string;
}

function LinkPreview({ url }: LinkPreviewProps) {
  const [previewData, setPreviewData] = useState<null | PreviewData>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLinkPreview(url);
        console.log(data);
        setPreviewData(data);
      } catch (error) {
        console.error(error);
      } finally {
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
    <div onClick={handleClick} className="cursor-pointer">
      <div>hello</div>
    </div>
  );
}

export default LinkPreview;
