// eslint-disable-next-line @typescript-eslint/no-explicit-any
const saveAnalysis = async (info: any) => {
  try {
    const response = await fetch("/api/tiktok_analysis/save", {
      method: "POST",
      body: JSON.stringify(info),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default saveAnalysis;
