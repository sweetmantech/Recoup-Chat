const getFunnelAnalysis = async (chatId: string) => {
  const response = await fetch(`/api/funnel_analysis?pilotId=${chatId}`);
  const data = await response.json();
  return data.data;
};

export default getFunnelAnalysis;
