import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useState } from "react";
import getPitchReport from "@/lib/getPitchReport";
import getReportNextSteps from "@/lib/getReportNextSteps";
import { useUserProvider } from "@/providers/UserProvder";

const useSpecificReport = () => {
  const [reportContent, setReportContent] = useState("");
  const [rawReportContent, setRawReportContent] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const funnelReport = useFunnelReportProvider();
  const { email } = useUserProvider();

  const setSpecificReport = async (pitch_name: string) => {
    setIsGeneratingReport(true);
    const { reportContent, rawContent } = await getPitchReport({
      content: funnelReport.funnelRawReportContent,
      pitch_name: pitch_name,
      artistImage: funnelReport.bannerArtistName,
      artistName: funnelReport.bannerImage,
      email,
    });
    setReportContent(reportContent);
    setRawReportContent(rawContent);
    const nextSteps = await getReportNextSteps({
      content: funnelReport.funnelRawReportContent,
    });
    setNextSteps(nextSteps);
    setIsGeneratingReport(false);

    return {
      rawContent,
      nextSteps,
    };
  };

  return {
    reportContent,
    rawReportContent,
    nextSteps,
    setReportContent,
    setRawReportContent,
    setNextSteps,
    isGeneratingReport,
    setIsGeneratingReport,
    setSpecificReport,
  };
};

export default useSpecificReport;
