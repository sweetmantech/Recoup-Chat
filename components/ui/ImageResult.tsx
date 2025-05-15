import Image from "next/image";
import { ImageGenerationResult } from "@/lib/tools/generateImage";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useImageDownloader } from "@/hooks/useImageDownloader";

interface ImageResultProps {
  result: ImageGenerationResult;
}

export function ImageResult({ result }: ImageResultProps) {
  const { 
    isDownloading, 
    isReady, 
    handleDownload 
  } = useImageDownloader({
    imageUrl: result.arweaveUrl,
    enabled: result.success
  });

  if (!result.success) {
    return (
      <div className="w-full max-w-md mx-auto p-4 border border-red-200 rounded-md bg-red-50">
        <p className="text-sm font-medium text-red-600">
          Error generating image
        </p>
        <p className="text-sm text-red-500">
          {result.error || "Unknown error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {result.arweaveUrl ? (
        <div className="border border-gray-200 rounded-2xl group cursor-pointer relative overflow-hidden" style={{ maxWidth: "28rem", maxHeight: "28rem" }}>
          <div className="relative w-full h-full max-h-[28rem]">
            {/* Top gradient overlay */}
            <div className="absolute z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-within:opacity-100 end-0 top-0 w-full">
              <div className="bg-gradient-to-t from-transparent to-black/30 h-20 w-full md:rounded-t-2xl" />
            </div>
            
            {/* Bottom gradient overlay */}
            <div className="absolute z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus-within:opacity-100 end-0 bottom-0 w-full">
              <div className="bg-gradient-to-b from-transparent to-black/30 h-20 w-full md:rounded-b-2xl" />
            </div>
            
            {/* Download button with tooltip */}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-20 md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-200/10"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    aria-label="Download image"
                  >
                    <Download className={`h-4 w-4 text-white ${isDownloading ? 'animate-pulse' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isReady ? 'Download' : 'Preparing download...'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="w-full h-auto" style={{ maxWidth: "28rem", maxHeight: "28rem" }}>
              <Image 
                src={result.arweaveUrl} 
                alt="Generated image"
                width={448} 
                height={448}
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  maxWidth: '28rem',
                  maxHeight: '28rem',
                  objectFit: 'contain'
                }}
                priority
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50 max-w-md">
          <p className="text-sm text-gray-500">
            {result.message || "Image generated but storage URL not available."}
          </p>
        </div>
      )}
    </div>
  );
}
