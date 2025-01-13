import instructions from "@/evals/scripts/instructions.json";

import {
  HTML_RESPONSE_FORMAT_INSTRUCTIONS,
  REPORT_SUMMARY_NOTE,
} from "../consts";
import { FUNNEL_ANALYSIS } from "@/types/Agent";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const toolSystemMessage = (context: any, question: any, toolName: string) => {
  if (toolName === "getArtistAnalysis")
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}
    ${instructions.get_tiktok_analysis}
    ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
    `;
  if (toolName === "getVideosInfo")
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}
    ${instructions.get_tiktok_video_comments}
    `;
  if (toolName === "getScoreInfo")
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}
    ${instructions.get_campaign_score}
    ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}`;

  if (toolName === "getSegmentsReport")
    return `
    Context: ${JSON.stringify(context)}
    Question: ${question}
    ${instructions.get_segments_report_summary}
    ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
    NOTE: ${REPORT_SUMMARY_NOTE}`;

  if (toolName === "getInstrumentalStyleSuggestions") {
    const comments = context?.map(
      (analysis: FUNNEL_ANALYSIS) => analysis.funnel_analytics_comments,
    );
    const segments = context?.map(
      (analysis: FUNNEL_ANALYSIS) => analysis.funnel_analytics_segments,
    );
    return `
      [Context]: ${JSON.stringify({
        comments: comments.flat(),
        segments: segments.flat(),
      })}
      [Instruction]: ${instructions.instrumental_style_suggestion}
      Make suggestions for instrumental styles based on my audiences existing work.
      ${HTML_RESPONSE_FORMAT_INSTRUCTIONS}
      NOTE: ${REPORT_SUMMARY_NOTE}
    `;
  }

  return "";
};

export default toolSystemMessage;
