export type PreviewData =
  | {
      url: string;
      title: string;
      siteName: string | undefined;
      description: string | undefined;
      mediaType: string;
      contentType: string | undefined;
      images: string[];
      videos: {
        url: string | undefined;
        secureUrl: string | undefined;
        type: string | undefined;
        width: string | undefined;
        height: string | undefined;
      }[];
      favicons: any[];
    }
  | {
      [key: string]: any;
    };
