import getDefaultDataset from "@/lib/apify/getDefaultDataset";
import getFormattedAccountInfo from "@/lib/apify/getFormattedAccountInfo";
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
    const defaultDatasetId = await runTikTokActor(input, "clockworks~tiktok-scraper");
    const timer = setInterval(async () => {
      const data = await getDefaultDataset(defaultDatasetId as string);
      const formattedData = getFormattedAccountInfo(data);

      if (formattedData.length) {
        clearInterval(timer)
        return Response.json({
          success: true,
          data,
        });
      }
    })
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}
