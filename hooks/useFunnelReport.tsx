import getFullReport from "@/lib/getFullReport";
import getReportNextSteps from "@/lib/getReportNextSteps";
import { useUserProvider } from "@/providers/UserProvder";
import { useState } from "react";

const useFunnelReport = () => {
  const [funnelTrends, setFunnelTrends] = useState<any>(null);
  const [isSearchingTrends, setIsSearchingTrends] = useState(false);
  const [isGettingVideos, setIsGettingVideos] = useState(false);
  const [isGettingAnalysis, setIsGettingAnalysis] = useState(false);
  const [funnelVideos, setFunnelVideos] = useState<any>(null);
  const [funnelAnalysis, setFunnelAnalysis] = useState<any>(null);
  const [funnelNextSteps, setFunnelNextSteps] = useState("");
  const [funnelReportContent, setFunnelReportContent] = useState("");
  const [funnelRawReportContent, setFunnelRawReportContent] = useState("");
  const [funnelSummary, setFunnelSummary] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerArtistName, setBannerArtistName] = useState("");
  const [pitchName, setPitchName] = useState("");
  const { email } = useUserProvider();

  const setFunnelReport = async (analysis: any, artistProfile: any) => {
    setIsGettingAnalysis(true);
    setFunnelAnalysis(analysis);
    setBannerImage(artistProfile?.image);
    setBannerArtistName(artistProfile?.name);
    const { reportContent, rawContent } = await getFullReport({
      ...analysis,
      artistImage: artistProfile?.image,
      artistName: artistProfile?.name,
      email,
    });
    setFunnelReportContent(reportContent);
    setFunnelRawReportContent(rawContent);
    const nextSteps = await getReportNextSteps(analysis);
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
    setFunnelAnalysis,
    setFunnelNextSteps,
    funnelNextSteps,
    funnelReportContent,
    setIsGettingAnalysis,
    isGettingAnalysis,
    setFunnelReportContent,
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
    pitchName,
    setPitchName,
  };
};

export default useFunnelReport;
