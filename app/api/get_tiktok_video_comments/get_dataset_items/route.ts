import getDataset from "@/lib/apify/getDataset";
import getFormattedCommentsInfo from "@/lib/apify/getFormattedCommentsInfo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const datasetId = req.nextUrl.searchParams.get("datasetId");

  try {
    const data = await getDataset(datasetId as string);
    const formattedData = getFormattedCommentsInfo(data);

    return Response.json({
      success: true,
      data: {
        videos: formattedData.videos,
        total_video_comments_count: formattedData.totalComments,
      },
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
