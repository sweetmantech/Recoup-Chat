import { createPdf } from "@/lib/pdf/createPdf";
import sendReportEmail from "@/lib/sendReportEmail";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useState } from "react";

const useDownloadReport = () => {
  const [downloading, setDownloading] = useState(false);
  const { streamingTitle } = useConversationsProvider();
  const { email } = useUserProvider();
  const { tiktokRawReportContent } = useTikTokReportProvider();
  const { selectedArtist } = useArtistProvider();

  const downloadReport = async () => {
    setDownloading(true);
    try {
      sendReportEmail(
        tiktokRawReportContent,
        selectedArtist?.image || "",
        email || "",
        streamingTitle,
      );
      const doc = await createPdf({
        pdfDomElementId: "segment-report",
        name: `${streamingTitle}.pdf`,
      });
      doc?.save(`${streamingTitle}.pdf`);
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
