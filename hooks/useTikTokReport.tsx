import getFullReport from "@/lib/getFullReport";
import { useEffect, useState } from "react";

const useTikTokReport = () => {
  const [tiktokTrends, setTiktokTrends] = useState<any>(null);
  const [isSearchingTrends, setIsSearchingTrends] = useState(false);
  const [isGettingVideos, setIsGettingVideos] = useState(false);
  const [isGettingAnalysis, setIsGettingAnalysis] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [tiktokVideos, setTiktokVideos] = useState<any>({});
  const [tiktokAnalysis, setTiktokAnalysis] = useState<any>(null);
  const [tiktokNextSteps, setTiktokNextSteps] = useState("");
  const [tiktokReportContent, setTiktokReportContent] = useState("");
  const [tiktokRawReportContent, setTiktokRawReportContent] = useState("");
  const [tiktokSummary, setTikTokSummary] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerArtistName, setBannerArtistName] = useState("");

  useEffect(() => {
    const init = async () => {
      setIsGeneratingReport(true);
      const { reportContent, rawContent } = await getFullReport(tiktokAnalysis);
      setTiktokReportContent(reportContent);
      setTiktokRawReportContent(rawContent);
      setIsGeneratingReport(false);
    };
    if (!tiktokAnalysis?.segmentName) return;
    init();
  }, [tiktokAnalysis]);

  const initReport = () => {
    setTiktokTrends(null);
    setTiktokVideos({});
  };

  const clearReportCache = () => {
    setTiktokNextSteps("");
    setTikTokSummary("");
    setTiktokRawReportContent("");
    setTiktokReportContent("");
  };

  return {
    initReport,
    isSearchingTrends,
    setTiktokTrends,
    setIsSearchingTrends,
    tiktokTrends,
    setIsGettingVideos,
    isGettingVideos,
    setTiktokVideos,
    tiktokVideos,
    setTiktokAnalysis,
    setTiktokNextSteps,
    tiktokNextSteps,
    tiktokReportContent,
    setIsGettingAnalysis,
    isGettingAnalysis,
    setTiktokReportContent,
    setIsGeneratingReport,
    isGeneratingReport,
    tiktokAnalysis,
    setTiktokRawReportContent,
    tiktokRawReportContent,
    tiktokSummary,
    setTikTokSummary,
    clearReportCache,
    bannerImage,
    bannerArtistName,
    setBannerArtistName,
    setBannerImage,
  };
};

export default useTikTokReport;
