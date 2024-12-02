// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFullReport = async (context: any) => {
  try {
    const response = await fetch("/api/report", {
      method: "POST",
      body: JSON.stringify(context),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reader = response.body?.getReader();
    if (!reader) return "";
    let receivedData = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      receivedData += new TextDecoder().decode(value);
    }
    const data = receivedData
      .split("0:")
      .map((str) => str.slice(1, str.length - 2).replaceAll("\n", ""))
      .join("");

    const reportContent = data.replaceAll("\n", "");
    return reportContent;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getFullReport;
