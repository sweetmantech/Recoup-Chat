import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

/**
 * Generates prompt suggestions using the Vercel AI SDK.
 * @param answer - The context or answer string to base suggestions on.
 * @returns Promise<string[]> - An array of prompt suggestion strings.
 * @throws Error if the AI call fails or the response is invalid.
 */
export default async function generatePromptSuggestions(answer: string): Promise<string[]> {
  // Build the prompt/messages for the AI model
  const userPrompt = `Based on the conversation context, generate helpful follow-up questions that encourage deeper exploration and analysis of the provided data.\n  - Questions should be framed to help guide the user to actionable insights.\n  - Utilize the existing data context to craft relevant and engaging questions.\n  - Ensure that questions are forward-thinking, aimed at helping the user make informed decisions or identify key trends.\n  - Keep questions to 10 words or less.\n  - Dumb it down to a 7th grade reading level.\n  - Limit number of questions to 4 max.\n\n  For example:\n  "What should we do with this data?" - Too broad.\n  "How can we use data from top fans to boost engagement?" - More specific and action-oriented.\n  \n  Answer:\n  ${answer}\n  `;

  const systemPrompt = `Let's get response with only this json format. {"data": [string]}`;

  // Call the Vercel AI SDK
  const result = await generateText({
    model: openai.chat("gpt-3.5-turbo"),
    messages: [
      { role: "user", content: userPrompt },
      { role: "system", content: systemPrompt },
    ],
    // You can add more options here if needed
  });

  // Parse the response
  let questions: string[] = [];
  try {
    const content = result.text;
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed.data)) {
      questions = parsed.data;
    } else {
      throw new Error("Invalid response format: 'data' is not an array");
    }
  } catch (err) {
    throw new Error(`Failed to parse AI response: ${err instanceof Error ? err.message : String(err)}`);
  }

  return questions;
} 