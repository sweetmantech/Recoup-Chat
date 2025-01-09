import { FUNNEL_ANALYSIS } from "@/types/Agent";

const getAnalysisThoughts = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return funnel_analyses.reduce((acc: any, analysis: FUNNEL_ANALYSIS) => {
    acc[analysis.type.toLowerCase()] = { status: analysis.status };
    return acc;
  }, {});
};

export default getAnalysisThoughts;
