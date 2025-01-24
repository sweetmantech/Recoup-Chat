import getFunnelAnalysis from "./getFunnelAnalysis";

const getFunnelChatContext = async (active_analaysis_id: string) => {
  if (!active_analaysis_id) return "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let funnelAnalaysisContext: any = null;
  if (active_analaysis_id)
    funnelAnalaysisContext = await getFunnelAnalysis(active_analaysis_id);
  if (funnelAnalaysisContext) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const postComments: any = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const segments: any = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    funnelAnalaysisContext?.map((funnel_analysis: any) => {
      postComments.push(funnel_analysis.funnel_analytics_comments);
      segments.push(funnel_analysis.funnel_analytics_segments);
    });
    return JSON.stringify({
      PostContents: postComments.flat(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Experties: segments.flat().map((segment: any) => segment.name),
    });
  }

  return "";
};

export default getFunnelChatContext;
