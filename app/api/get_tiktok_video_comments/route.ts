import getFormattedCommentsInfo from "@/lib/apify/getFormattedCommentsInfo";
import getTiktokVideoComments from "@/lib/apify/getTiktokVideoComments";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const postURLs = req.nextUrl.searchParams.get("postURLs");

  try {
    const videoComments = await getTiktokVideoComments(
      JSON.parse(postURLs as string),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = getFormattedCommentsInfo(videoComments as any);
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
