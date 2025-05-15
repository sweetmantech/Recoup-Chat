import Image from "next/image";
import { ImageGenerationResult } from "@/lib/tools/generateImage";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ImageResultProps {
  result: ImageGenerationResult;
}

export function ImageResult({ result }: ImageResultProps) {
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

  const handleDownload = () => {
    if (result.arweaveUrl) {
      const link = document.createElement("a");
      link.href = result.arweaveUrl;
      link.target = "_blank";
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 md:rounded-2xl">
      {result.arweaveUrl ? (
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden md:rounded-2xl">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 z-10 md:rounded-xl" 
              onClick={handleDownload}
              aria-label="Download image"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Image
              src={result.arweaveUrl}
              alt="Generated image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : (
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="text-sm text-gray-500">
            {result.message || "Image generated but storage URL not available."}
          </p>
        </div>
      )}
    </div>
  );
}
