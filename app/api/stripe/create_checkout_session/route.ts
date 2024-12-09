import { NextRequest } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function GET(req: NextRequest) {
  const successUrl = req.nextUrl.searchParams.get("successUrl");
  const priceId = req.nextUrl.searchParams.get("priceId");

  try {
    const response = await stripe.checkout.sessions.create({
      success_url: successUrl,
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': 1,
      mode: 'payment'
    });

    const data = await response.json();
    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
