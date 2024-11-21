import getDefaultDataset from "@/lib/apify/getDefaultDataset";
import getFormattedCommentsInfo from "@/lib/apify/getFormattedCommentsInfo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const defaultDatasetId = req.nextUrl.searchParams.get("defaultDatasetId");

  try {
    const data = await getDefaultDataset(defaultDatasetId as string);
    const formattedData = getFormattedCommentsInfo(data);

    return Response.json({
      success: true,
      data: {
        comments_video_info: formattedData.commentsInfo,
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
