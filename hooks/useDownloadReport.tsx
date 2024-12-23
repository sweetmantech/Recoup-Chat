import { createPdf } from "@/lib/pdf/createPdf";
import sendReportEmail from "@/lib/sendReportEmail";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useState } from "react";

const useDownloadReport = () => {
  const [downloading, setDownloading] = useState(false);
  const { streamingTitle } = useConversationsProvider();
  const { email } = useUserProvider();
  const { funnelRawReportContent, funnelAnalysis } = useFunnelReportProvider();
  const { selectedArtist } = useArtistProvider();
  const { titleMessage } = useInitialMessagesProvider();

  const downloadReport = async () => {
    setDownloading(true);
    try {
      const reportTitle = streamingTitle || titleMessage?.metadata?.title;
      sendReportEmail(
        funnelRawReportContent,
        funnelAnalysis?.image || selectedArtist?.image,
        funnelAnalysis?.nickname ||
          selectedArtist?.name ||
          funnelAnalysis?.nickname,
        email || "",
        reportTitle,
      );
      const doc = await createPdf({
        pdfDomElementId: "segment-report",
        name: `${reportTitle}.pdf`,
      });
      doc?.save(`${reportTitle}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloading(false);
    }
  };

  return {
    downloadReport,
    downloading,
  };
};

export default useDownloadReport;
