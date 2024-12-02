import { NextRequest } from "next/server";
import OpenAI from "openai";
import instructions from "@/evals/scripts/instructions.json";
import {
  AI_MODEL,
  HTML_RESPONSE_FORMAT_INSTRUCTIONS,
  REPORT_NEXT_STEP_NOTE,
} from "@/lib/consts";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const openai = new OpenAI();
    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      max_tokens: 1111,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: `Context: ${JSON.stringify(body)}`,
        },
        {
          role: "system",
          content: `${instructions.get_segments_report_next_step}
          ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
          NOTE: ${REPORT_NEXT_STEP_NOTE}`,
        },
      ],
    });

    try {
      const answer = response.choices[0].message!.content!.toString();
      return Response.json(
        {
          data: answer,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error(error);
      return Response.json({ data: [], answer: response }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ data: [], error }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
