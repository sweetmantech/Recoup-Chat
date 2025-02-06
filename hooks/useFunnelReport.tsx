import getSegmentReport from "@/lib/report/getSegmentReport";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useFunnelReport = () => {
  const [isLoadingReport, setIsLoadingReport] = useState(true);
  const [funnelNextSteps, setFunnelNextSteps] = useState("");
  const [funnelReportContent, setFunnelReportContent] = useState("");
  const [funnelRawReportContent, setFunnelRawReportContent] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerArtistName, setBannerArtistName] = useState("");
  const [pitchName, setPitchName] = useState("");
  const { chat_id: chatId } = useParams();
  const pathname = usePathname();
  const isReportPage = pathname.includes("/report");

  useEffect(() => {
    const getFunnelReport = async () => {
      if (chatId && isReportPage) {
        const {
          artistImage,
          artistName,
          reportContent,
          rawReportContent,
          nextSteps,
        } = await getSegmentReport(chatId as string);
        setFunnelNextSteps(reportContent);
        setFunnelRawReportContent(rawReportContent);
        setFunnelNextSteps(nextSteps);
        setBannerImage(artistImage);
        setBannerArtistName(artistName);
        setIsLoadingReport(false);
      }
      clearReportCache();
      setIsLoadingReport(true);
    };
    getFunnelReport();
  }, [chatId, isReportPage]);

  const clearReportCache = () => {
    setFunnelNextSteps("");
    setFunnelRawReportContent("");
    setFunnelReportContent("");
    setBannerArtistName("");
    setBannerImage("");
  };

  return {
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
