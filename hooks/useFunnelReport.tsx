import getFullReport from "@/lib/getFullReport";
import { useUserProvider } from "@/providers/UserProvder";
import { useState } from "react";

const useFunnelReport = () => {
  const [funnelTrends, setFunnelTrends] = useState<any>(null);
  const [isSearchingTrends, setIsSearchingTrends] = useState(false);
  const [isGettingVideos, setIsGettingVideos] = useState(false);
  const [isGettingAnalysis, setIsGettingAnalysis] = useState(false);
  const [funnelVideos, setFunnelVideos] = useState<any>(null);
  const [funnelNextSteps, setFunnelNextSteps] = useState("");
  const [funnelReportContent, setFunnelReportContent] = useState("");
  const [funnelRawReportContent, setFunnelRawReportContent] = useState("");
  const [funnelSummary, setFunnelSummary] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerArtistName, setBannerArtistName] = useState("");
  const [pitchName, setPitchName] = useState("");
  const { email, address } = useUserProvider();

  const setFunnelReport = async (agentId: any, segmentName: any) => {
    setIsGettingAnalysis(true);
    const { reportContent, rawContent, nextSteps } = await getFullReport({
      agentId,
      segmentName,
      address,
      email,
    });
    setFunnelReportContent(reportContent);
    setFunnelRawReportContent(rawContent);
    setFunnelNextSteps(nextSteps);
    setIsGettingAnalysis(false);

    return {
      rawContent,
      nextSteps,
    };
  };

  const initReport = () => {
    setFunnelTrends(null);
    setFunnelVideos({});
  };

  const clearReportCache = () => {
    setFunnelNextSteps("");
    setFunnelSummary("");
    setFunnelRawReportContent("");
    setFunnelReportContent("");
    setBannerArtistName("");
    setBannerImage("");
  };

  return {
    initReport,
    setFunnelReport,
    isSearchingTrends,
    setFunnelTrends,
    setIsSearchingTrends,
    funnelTrends,
    setIsGettingVideos,
    isGettingVideos,
    setFunnelVideos,
    funnelVideos,
    setFunnelNextSteps,
    funnelNextSteps,
    funnelReportContent,
    setIsGettingAnalysis,
    isGettingAnalysis,
    setFunnelReportContent,
    setFunnelRawReportContent,
    funnelRawReportContent,
    funnelSummary,
    setFunnelSummary,
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
