import { useState } from "react";

const useSpecificReport = () => {
  const [reportContent, setReportContent] = useState("");
  const [rawReportContent, setRawReportContent] = useState("");
  const [nextSteps, setNextSteps] = useState("");

  return {
    reportContent,
    rawReportContent,
    nextSteps,
    setReportContent,
    setRawReportContent,
    setNextSteps,
  };
};

export default useSpecificReport;
