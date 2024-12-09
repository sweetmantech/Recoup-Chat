import stripeClient from "@/lib/stripe/client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const successUrl = req.nextUrl.searchParams.get("successUrl");
  const priceId = req.nextUrl.searchParams.get("priceId");

  try {
    const session = await stripeClient.checkout.sessions.create({
      success_url: successUrl as string,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": 1,
      mode: "payment",
    });

    return Response.json({ data: session }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
