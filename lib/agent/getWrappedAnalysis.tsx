import { FUNNEL_ANALYSIS } from "@/types/Agent";

const getWrappedAnalysis = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  const wrappedAnalysis = funnel_analyses.find(
    (funnel_analysis: FUNNEL_ANALYSIS) => !funnel_analysis.type,
  );

  return wrappedAnalysis;
};

export default getWrappedAnalysis;
