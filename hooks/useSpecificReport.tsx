import getPdfReport from "@/lib/getPdfReport";
import getTikTokReport from "@/lib/tiktok/getTikTokReport";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useEffect, useState } from "react";
import getArtist from "@/lib/getArtist";
import getPitchReport from "@/lib/getPitchReport";
import getReportNextSteps from "@/lib/getReportNextSteps";
import { useUserProvider } from "@/providers/UserProvder";

const useSpecificReport = (message: any) => {
  const [reportContent, setReportContent] = useState("");
  const [rawReportContent, setRawReportContent] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const { messages } = useMessagesProvider();
  const { artists } = useArtistProvider();
  const funnelReport = useFunnelReportProvider();
  const messageIndex = messages.findIndex((ele) => ele.id === message.id);
  const [reportTracking, setReportTracking] = useState(true);
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
  useEffect(() => {
    const init = async () => {
      setReportTracking(true);
      const response = await getTikTokReport(message.metadata.referenceId);
      if (messageIndex === 1) {
        const artist = await getArtist(message.metadata?.artistId);
        funnelReport.setBannerImage(artist?.image || "");
        funnelReport.setBannerArtistName(artist?.name || "");
        funnelReport.setFunnelSummary(response.summary);
        funnelReport.setFunnelRawReportContent(response.report);
        funnelReport.setFunnelReportContent(getPdfReport(response.report));
        funnelReport.setFunnelNextSteps(response.next_steps);
      } else {
        setRawReportContent(response.report);
        setReportContent(getPdfReport(response.report));
        setNextSteps(response.next_steps);
      }
      setReportTracking(false);
    };
    if (!message?.metadata?.referenceId) {
      setReportTracking(false);
      return;
    }
    init();
  }, [message, artists]);

  return {
    reportContent,
    rawReportContent,
    nextSteps,
    setReportContent,
    setRawReportContent,
    setNextSteps,
    isGeneratingReport,
    setIsGeneratingReport,
    reportTracking,
    setSpecificReport,
  };
};

export default useSpecificReport;
