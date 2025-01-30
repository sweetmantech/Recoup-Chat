const getFunnelReport = async (referenceId: string) => {
  try {
    const response = await fetch(`/api/funnel_report?id=${referenceId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};

export default getFunnelReport;
