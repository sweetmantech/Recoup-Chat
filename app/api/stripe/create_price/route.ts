import stripeClient from "@/lib/stripe/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const productName = req.nextUrl.searchParams.get("productName");
  const priceAmount = req.nextUrl.searchParams.get("price");

  try {
    const isSubscription = priceAmount === "2000";
    const price = await stripeClient.prices.create({
      currency: "usd",
      unit_amount: priceAmount,
      product_data: {
        name: productName,
      },
    });

    if (isSubscription) {
      price.type = "recurring";
      price.recurring = {
        aggregate_usage: null,
        interval: "month",
        interval_count: 1,
        trial_period_days: null,
        usage_type: "licensed",
      };
    }

    return Response.json({ data: price }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
