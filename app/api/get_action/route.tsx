import { AI_MODEL } from "@/lib/consts";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const context = body.context;

  try {
    const openai = new OpenAI();

    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "user",
          content: `
            Context: ${context}
            Question: How can we offer the most valuable recommendations based on the activeArtist context?
            Note:  Response shoule be more formal, no more than 50 characters.
            
            Example Answers:
              What posts have they been releasing this week?
              What engagement have they received this week?
              How is this changing from older data?
          `,
        },
      ],
      store: true,
    });

    const action = response.choices[0].message!.content!.toString();
    return Response.json({
      message: "success",
      action,
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
