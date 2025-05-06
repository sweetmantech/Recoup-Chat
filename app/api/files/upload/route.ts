import { NextResponse } from "next/server";
import { uploadBase64ToArweave } from "@/lib/arweave/uploadBase64ToArweave";

interface FileResponse {
  fileName: string;
  url: string;
  mimetype: string;
  filesize: number;
  id?: string;
  success: boolean;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file provided");
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    
    // Upload to Arweave
    const arweaveResult = await uploadBase64ToArweave(
      base64Data,
      file.type,
      file.name
    );

    // Return file response with Arweave URL
    const fileResponse: FileResponse = {
      fileName: file.name,
      url: arweaveResult.url,
      mimetype: file.type,
      filesize: buffer.byteLength,
      id: arweaveResult.id,
      success: true
    };

    return NextResponse.json(fileResponse);
  } catch (error) {
    console.error("Arweave upload failed:", error);
    
    // Fallback to mock response for testing when Arweave is not available
    if (process.env.NODE_ENV === "development") {
      console.log("Using mock response in development mode");
      
      // Mock image URLs that will work in the UI for preview
      const mockImages = [
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
        "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d",
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      ];
      
      // Select a random image from the array
      const randomImageUrl = mockImages[Math.floor(Math.random() * mockImages.length)];

      const mockFileResponse: FileResponse = {
        fileName: "mock-image.jpg",
        url: randomImageUrl,
        mimetype: "image/jpeg",
        filesize: 1024 * 1024, // 1MB in bytes
        success: true
      };

      return NextResponse.json(mockFileResponse);
    }
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}