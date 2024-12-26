import { createPdf } from "@/lib/pdf/createPdf";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import { useState } from "react";

const useDownloadReport = () => {
  const [downloading, setDownloading] = useState(false);
  const { streamingTitle } = useConversationsProvider();
  const { titleMessage } = useInitialMessagesProvider();

  const downloadReport = async () => {
    setDownloading(true);
    try {
      const reportTitle = streamingTitle || titleMessage?.metadata?.title;
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
