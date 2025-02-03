import getAggregatedAgentSocials from "@/lib/agent/getAggregatedAgentSocials";
import getSegmentsTotalSize from "@/lib/agent/getSegmentsTotalSize";
import getFullReport from "@/lib/getFullReport";
import getReportNextSteps from "@/lib/getReportNextSteps";
import getAgentsInfoFromStack from "@/lib/stack/getAgentsInfoFromStack";
import { useUserProvider } from "@/providers/UserProvder";
import { useEffect, useState } from "react";

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
  const { email, address } = useUserProvider();

  const setFunnelReport = async (agentId: any, segmentName: any) => {
    setIsGettingAnalysis(true);
    const { segments, commentIds } = await getAgentsInfoFromStack(
      agentId,
      address,
    );
    const segment = segments.find(
      (segmentEle: any) => segmentEle.name === segmentName,
    );
    const totalSegmentSize = getSegmentsTotalSize(segments);
    const { followerCount, username, avatar } =
      await getAggregatedAgentSocials(agentId);
    setBannerImage(avatar);
    setBannerArtistName(username);
    const agentdata = {
      segments,
      commentIds,
      segmentName,
      segmentSize: (followerCount / totalSegmentSize) * segment.size,
      segmentPercentage: Number(
        (segment.size / totalSegmentSize) * 100,
      ).toFixed(2),
    };
    const { reportContent, rawContent } = await getFullReport({
      ...agentdata,
      artistImage: avatar,
      artistName: username,
      email,
    });
    setFunnelReportContent(reportContent);
    setFunnelRawReportContent(rawContent);
    const nextSteps = await getReportNextSteps(agentdata);
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

  useEffect(() => {
    getAggregatedAgentSocials("7faa64bc-b326-425e-a8f0-e4d032228748");
  }, []);

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
