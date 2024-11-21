import getDefaultDataset from "@/lib/apify/getDefaultDataset";
import getFormattedCommentsInfo from "@/lib/apify/getFormattedCommentsInfo";
import runTikTokActor from "@/lib/apify/runTikTokActor";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const postURLs = req.nextUrl.searchParams.get("postURLs");

  const input = {
    postURLs: JSON.parse(postURLs as string),
    commentsPerPost: 100,
    maxRepliesPerComment: 0,
  };

  try {
    const defaultDatasetId = await runTikTokActor(input);
    while (1) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const data = await getDefaultDataset(defaultDatasetId);
        const formattedData = getFormattedCommentsInfo(data);
        if (formattedData.commentsInfo.length > 0) {
          return Response.json({
            success: true,
            data: formattedData,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return Response.json({ success: false, error: "Error fetching data" });
      }
    }
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
