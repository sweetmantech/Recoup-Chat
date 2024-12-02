import {
  AI_MODEL,
  FULL_REPORT_NOTE,
  HTML_RESPONSE_FORMAT_INSTRUCTIONS,
} from "@/lib/consts";
import { NextRequest } from "next/server";
import instructions from "@/evals/scripts/instructions.json";
import { LanguageModelV1, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const result = await streamText({
      model: openai(AI_MODEL) as LanguageModelV1,
      system: `Context: ${JSON.stringify(body)}
      Question: Please, create a tiktok fan segment report.
      ${instructions.get_segements_report}
      ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
      NOTE: ${FULL_REPORT_NOTE}`,
      maxTokens: 1111,
      temperature: 0.7,
      messages: [],
    });
    // const openai = new OpenAI();

    // const response = await openai.chat.completions.create({
    //   model: AI_MODEL,
    //   max_tokens: 1111,
    //   temperature: 0.7,
    //   messages: [
    //     {
    //       role: "user",
    //       content: `Context: ${JSON.stringify(body)}
    //       Question: Please, create a tiktok fan segment report.`,
    //     },
    //     {
    //       role: "system",
    //       content: `${instructions.get_segements_report}
    //       ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
    //       NOTE: ${FULL_REPORT_NOTE}`,
    //     },
    //   ],
    //   store: true,
    // });

    // const content = response.choices[0].message!.content!.toString();
    // return Response.json({
    //   message: "success",
    //   content,
    // });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "failed";
    return Response.json({ message }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
