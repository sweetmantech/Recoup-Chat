import getActorStatus from "@/lib/apify/getActorStatus";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const defaultDatasetId = req.nextUrl.searchParams.get("defaultDatasetId");

  try {
    const data = await getActorStatus(defaultDatasetId as string);
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