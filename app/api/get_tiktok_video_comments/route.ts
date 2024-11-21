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
    return Response.json({
      success: true,
      data: defaultDatasetId,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}
