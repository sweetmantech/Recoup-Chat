import { AGENT_API } from "./consts";
import formatPdf from "./formatPdf";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFullReport = async (context: any) => {
  try {
    const response = await fetch(`${AGENT_API}/api/get_full_report`, {
      method: "POST",
      body: JSON.stringify(context),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    const content = data.content
      .toString()
      .replaceAll('\\"', '"')
      .replaceAll("\\n", "");

    const reportContent = content.replaceAll(/\\n/g, "");
    return formatPdf(reportContent);
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getFullReport;
