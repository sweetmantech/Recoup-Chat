import saveAnalysis from "./saveAnalysis";

const saveFunnelAnalysis = async (
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  analysis: any,
) => {
  while (1) {
    const data = await saveAnalysis(analysis);
    if (data) return data.id;
  }
};

export default saveFunnelAnalysis;
