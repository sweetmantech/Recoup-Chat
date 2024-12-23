import { useState } from "react";

const useFunnelReport = () => {
  const [funnelTrends, setFunnelTrends] = useState<any>(null);
  const [isSearchingTrends, setIsSearchingTrends] = useState(false);
  const [isGettingVideos, setIsGettingVideos] = useState(false);
  const [isGettingAnalysis, setIsGettingAnalysis] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [funnelVideos, setFunnelVideos] = useState<any>(null);
  const [funnelAnalysis, setFunnelAnalysis] = useState<any>(null);
  const [funnelNextSteps, setFunnelNextSteps] = useState("");
  const [funnelReportContent, setFunnelReportContent] = useState("");
  const [funnelRawReportContent, setFunnelRawReportContent] = useState("");
  const [funnelSummary, setFunnelSummary] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerArtistName, setBannerArtistName] = useState("");

  const initReport = () => {
    setFunnelTrends(null);
    setFunnelVideos({});
  };

  const clearReportCache = () => {
    setFunnelNextSteps("");
    setFunnelSummary("");
    setFunnelRawReportContent("");
    setFunnelReportContent("");
  };

  return {
    initReport,
    isSearchingTrends,
    setFunnelTrends,
    setIsSearchingTrends,
    funnelTrends,
    setIsGettingVideos,
    isGettingVideos,
    setFunnelVideos,
    funnelVideos,
    setFunnelAnalysis,
    setFunnelNextSteps,
    funnelNextSteps,
    funnelReportContent,
    setIsGettingAnalysis,
    isGettingAnalysis,
    setFunnelReportContent,
    setIsGeneratingReport,
    isGeneratingReport,
    funnelAnalysis,
    setFunnelRawReportContent,
    funnelRawReportContent,
    funnelSummary,
    setFunnelSummary,
    clearReportCache,
    bannerImage,
    bannerArtistName,
    setBannerArtistName,
    setBannerImage,
  };
};

export default useFunnelReport;
