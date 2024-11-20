import getBaseCampaign from "@/lib/chat/getBaseCampaign";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const artistId = req.nextUrl.searchParams.get("artistId");

  try {
    const context = await getBaseCampaign(artistId as string, email as string);
    return Response.json({
      success: true,
      data: context,
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
