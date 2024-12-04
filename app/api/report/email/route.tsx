import sendEmail from "@/lib/sendEmail";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const template = body.template;
  const subject = body.subject;
  const email = body.email;

  try {
    const data = {
      from: "sidney@syncstream.ai",
      to: email,
      subject,
      html: template,
    };
    await sendEmail(data);
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
