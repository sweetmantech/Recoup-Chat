import formatPdf from "./formatPdf";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFullReport = async (context: any) => {
  try {
    const response = await fetch(`/api/report`, {
      method: "POST",
      body: JSON.stringify(context),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const content = data
      .split("0:")
      .map((str: string) =>
        str
          .toString()
          .slice(1, str.length - 2)
          .replaceAll('\\"', '"')
          .replaceAll("\\n", ""),
      )
      .join("");

    const reportContent = content.replaceAll(/\\n/g, "");
    return formatPdf(reportContent);
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getFullReport;
