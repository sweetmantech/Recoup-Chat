const getTikTokReport = async (referenceId: string) => {
  try {
    const response = await fetch(`/api/tiktok_report?id=${referenceId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};

export default getTikTokReport;
