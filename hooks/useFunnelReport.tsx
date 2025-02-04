import getFullReport from "@/lib/getFullReport";
import { useUserProvider } from "@/providers/UserProvder";
import { useState } from "react";

const useFunnelReport = () => {
  const [isLoadingReport, setIsLoadingReport] = useState(false);
  const [funnelNextSteps, setFunnelNextSteps] = useState("");
  const [funnelReportContent, setFunnelReportContent] = useState("");
  const [funnelRawReportContent, setFunnelRawReportContent] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerArtistName, setBannerArtistName] = useState("");
  const [pitchName, setPitchName] = useState("");
  const { email, address } = useUserProvider();

  const setFunnelReport = async (agentId: any, segmentName: any) => {
    const { reportContent, rawContent, nextSteps, artistName, artistBanner } =
      await getFullReport({
        agentId,
        segmentName,
        address,
        email,
      });
    setFunnelReportContent(reportContent);
    setFunnelRawReportContent(rawContent);
    setFunnelNextSteps(nextSteps);
    setBannerImage(artistBanner);
    setBannerArtistName(artistName);

    return {
      rawContent,
      nextSteps,
    };
  };

  const clearReportCache = () => {
    setFunnelNextSteps("");
    setFunnelRawReportContent("");
    setFunnelReportContent("");
    setBannerArtistName("");
    setBannerImage("");
  };

  return {
    setFunnelReport,
    setFunnelNextSteps,
    funnelNextSteps,
    funnelReportContent,
    setIsLoadingReport,
    isLoadingReport,
    setFunnelReportContent,
    setFunnelRawReportContent,
    funnelRawReportContent,
    clearReportCache,
    bannerImage,
    bannerArtistName,
    setBannerArtistName,
    setBannerImage,
    pitchName,
    setPitchName,
  };
};

export default useFunnelReport;
