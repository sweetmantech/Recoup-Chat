import getCampaignScore from "@/lib/chat/getCampaignScore";

export async function GET() {
  try {
    const context = await getCampaignScore();
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
