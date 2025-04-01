import { SYSTEM_PROMPT } from "@/lib/consts";
import getKnowledgeBaseContext from "@/lib/agent/getKnowledgeBaseContext";

export async function getSystemPrompt(roomId?: string, artistId?: string): Promise<string> {
  let systemPrompt = SYSTEM_PROMPT;

  if (roomId) {
    const artistKnowledge = await getKnowledgeBaseContext(roomId);
    if (artistKnowledge) {
      systemPrompt = `${SYSTEM_PROMPT}
-----ARTIST KNOWLEDGE BASE-----
${artistKnowledge}
-----END KNOWLEDGE BASE-----`;
    }
  }

  if (artistId) {
    systemPrompt += ` The active artist_account_id is ${artistId}`;
  }

  return systemPrompt;
}

export default getSystemPrompt; 