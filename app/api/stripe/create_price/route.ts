import stripeClient from "@/lib/stripe/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const productName = req.nextUrl.searchParams.get("productName");

  try {
    const price = await stripeClient.prices.create({
      currency: "usd",
      unit_amount: 99,
      product_data: {
        name: productName,
      },
    });

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
