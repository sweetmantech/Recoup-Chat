import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const productName = req.nextUrl.searchParams.get("productName");

  try {
    const price = {
      currency: 'usd',
        unit_amount: 99,
        'recurring[interval]': 'month',
        'product_data[name]': productName
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    const response = await fetch('https://api.stripe.com/v1/prices', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SK}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(price).toString()
    })

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
