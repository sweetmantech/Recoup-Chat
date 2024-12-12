import stripeClient from "@/lib/stripe/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId");

  try {
    const subscriptions = await stripeClient.subscriptions.list({
      limit: 100,
      current_period_end: {
        gt: parseInt(Number(Date.now() / 1000).toFixed(0), 10),
      },
    });

    const activeSubscriptions = subscriptions?.data?.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (subscription: any) => subscription.metadata?.accountId === accountId,
    );
    return Response.json({ data: activeSubscriptions }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
