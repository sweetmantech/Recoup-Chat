import { createPdf } from "@/lib/pdf/createPdf";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useState } from "react";

const useDownloadReport = () => {
  const [downloading, setDownloading] = useState(false);
  const { streamingTitle } = useConversationsProvider();

  const downloadReport = async () => {
    setDownloading(true);
    try {
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
