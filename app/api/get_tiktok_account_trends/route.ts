import runTikTokActor from "@/lib/apify/runTikTokActor";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const handle = req.nextUrl.searchParams.get("handle");

  const profiles = [handle as string];
  const input = {
    resultsPerPage: 10,
    proxyCountryCode: "None",
    profiles,
  };

  try {
    const defaultDatasetId = await runTikTokActor(
      input,
      "clockworks~tiktok-scraper",
    );

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
