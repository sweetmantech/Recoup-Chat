import getActorStatus from "@/lib/apify/getActorStatus";
import getFormattedCommentsInfo from "@/lib/apify/getFormattedCommentsInfo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const defaultDatasetId = req.nextUrl.searchParams.get("defaultDatasetId");

  try {
    const response = await fetch(`https://api.apify.com/v2/datasets/${defaultDatasetId}/items?token=${process.env.APIFY_TOKEN}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    });
    const data = await response.json()
    return Response.json({
      success: true,
      data: getFormattedCommentsInfo(data),
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