import "server-only";

import { AI_MODEL, HTML_RESPONSE_FORMAT_INSTRUCTIONS } from "../consts";
import createArtist from "../tools/createArtist";
import getArtists from "../tools/getArtists";
import getArtistAnalysis from "../tools/getArtistAnalysis";
import createCampaign from "../tools/createCampaign";
import getCampaigns from "../tools/getCampaigns";
import updateArtistInfo from "../tools/updateArtistInfo";
import getScoreInfo from "../tools/getScoreInfo";
import getBaseCampaign from "../chat/getBaseCampaign";
import instructions from "@/evals/scripts/instructions.json";
import getVideosInfo from "../tools/getVideosInfo";
import getSegmentsReport from "../tools/getSegmentsReport";
import getPitchReport from "../tools/getPitchReport";
import getInstrumentalStyleSuggestions from "../tools/getInstrumentalStyleSuggestions";
import getFunnelChatContext from "../getFunnelChatContext";

export function createChatMessagesService() {
  return new ChatMessagesService();
}

class ChatMessagesService {
  constructor() {}

  async getChatSettings(
    question: string,
    email: string,
    artistId: string,
    active_analaysis_id: string,
    context: string,
  ) {
    const tools = this.fetchRelevantTools(question, email, artistId);
    let chatContext = await getFunnelChatContext(active_analaysis_id);
    if (!chatContext) chatContext = context;
    if (!chatContext)
      chatContext = await this.fetchRelevantContext(email, artistId);
    const systemMessage = `
*****
[Context]: ${chatContext}
*****
[Question]: ${question}
*****
[Instruction]: 
*****
${
  context || active_analaysis_id
    ? `
If question is related with content calendar, content calendar should reference the expertes and post urls & timestamp!.
`
    : `${instructions.get_campaign}`
}
${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
`;

    return {
      maxTokens: 1111,
      systemMessage,
      model: AI_MODEL,
      tools,
    };
  }

  private async fetchRelevantContext(
    email: string,
    artistId: string,
  ): Promise<string> {
    try {
      const data = await getBaseCampaign(artistId, email);
      const context = JSON.stringify(data);
      return context;
    } catch (error) {
      console.error("Error reading or parsing JSON files:", error);
      return "{}";
    }
  }

  private fetchRelevantTools(
    question: string,
    email: string,
    artistId: string,
  ) {
    try {
      return {
        getVideosInfo: getVideosInfo(question),
        getScoreInfo: getScoreInfo(question),
        createArtist: createArtist(question, email),
        getArtists: getArtists(question, email),
        getArtistAnalysis: getArtistAnalysis(question),
        createCampaign: createCampaign(question, email),
        getCampaigns: getCampaigns(question, email, artistId),
        updateArtistInfo: updateArtistInfo(question),
        getSegmentsReport: getSegmentsReport(question),
        getPitchReport: getPitchReport(question),
        getInstrumentalStyleSuggestions:
          getInstrumentalStyleSuggestions(question),
      };
    } catch (error) {
      console.error("Error reading or parsing JSON files:", error);
      return [];
    }
  }
}
