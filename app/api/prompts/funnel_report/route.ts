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
          content: `Based on the conversation context, generate four helpful follow-up questions.
            Format your answers using ONLY this structure:
            Prioritizes segment names with the highest value among segments in a given context.
            Examples: 
              - "Write [Brand Name] Pitch" 
              - "Write [Brand Name] Pitch"
              - "Create The Content Ideas"
              - "Do a Deeper Analysis"
          
          Context:
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
