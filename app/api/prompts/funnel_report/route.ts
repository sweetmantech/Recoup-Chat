import { AI_MODEL } from "@/lib/consts";
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const answer = body.answer;

  try {
    const openai = new OpenAI();

    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "user",
          content: `
          [Instruction]:
            Generate 4 useful follow-up questions based on the given context.
            Prioritize the brand name in the Brand Matchmaking section in the given context.
            ***Important: Format your answer using only the following structure.
                Examples:
                - "Write a pitch for [one of the brand names in Brand Matchmaking]."
                - "Write a pitch for [one of the brand names in Brand Matchmaking]."
                - "Create content ideas."
                - "Do deeper analysis."
          
          [Context]:
          ${answer}
          `,
        },
        {
          role: "system",
          content: `Let's get response with only this json format. {"data": [string]}`,
        },
      ],
      store: true,
      metadata: {
        feature: "prompt_suggestions",
        source: "follow_up_questions",
        context: "data_analysis",
      },
    });

    const questions = response.choices[0].message!.content!.toString();
    return Response.json({
      message: "success",
      questions: JSON.parse(questions).data,
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
