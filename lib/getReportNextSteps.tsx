// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReportNextSteps = async (context: any) => {
  try {
    const response = await fetch(`/api/segments/next-step`, {
      method: "POST",
      body: JSON.stringify(context),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getReportNextSteps;
