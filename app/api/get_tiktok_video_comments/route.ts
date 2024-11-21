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
    const data = await runTikTokActor(
      input,
      "clockworks~tiktok-comments-scraper",
    );
    return Response.json({
      success: true,
      data,
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
