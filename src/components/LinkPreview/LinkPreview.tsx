import { useState, useEffect } from "react";
import { getLinkPreview, type PreviewData } from ".";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";

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
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Oops!</AlertTitle>
        <AlertDescription>Failed to fetch link preview.</AlertDescription>
      </Alert>
    );
  }

  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-row max-w-lg gap-2"
    >
      <div className="basis-1/3">
        <img
          src={previewData?.images[0]}
          alt={previewData?.siteName || previewData?.title}
        />
      </div>
      <div className="basis-2/3 flex flex-col gap-1">
        <p className="text-base">{previewData.title}</p>
        <p className="text-xs line-clamp-3 ">{previewData.description}</p>
      </div>
    </div>
  );
}

export default LinkPreview;
