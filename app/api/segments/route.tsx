import { NextRequest } from "next/server";
import OpenAI from "openai";
import instructions from "@/evals/scripts/instructions.json";
import { AI_MODEL } from "@/lib/consts";

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
          content: `${instructions.get_fan_segments} \n Let's get response with only this json format. {"data": [{ string: number }, { string: number }]}.`,
        },
      ],
    });
    const answer = response.choices[0].message!.content!.toString();

    try {
      return Response.json(
        { data: JSON.parse(answer)?.data || [] },
        { status: 200 },
      );
    } catch (error) {
      console.error(error);
      return Response.json(
        { data: [], answer: response.choices[0].message!.content },
        { status: 400 },
      );
    }
  } catch (error) {
    console.error(error);
    return Response.json({ data: [], error }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
