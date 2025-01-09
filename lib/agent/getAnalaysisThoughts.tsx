import { FUNNEL_ANALYSIS } from "@/types/Agent";

const getAnalysisThoughts = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return funnel_analyses.reduce((acc: any, analysis: FUNNEL_ANALYSIS) => {
    if (analysis.type)
      acc[analysis.type.toLowerCase()] = { status: analysis.status };
    else acc["wrapped"] = { status: analysis.status };
    return acc;
  }, {});
};

export default getAnalysisThoughts;
