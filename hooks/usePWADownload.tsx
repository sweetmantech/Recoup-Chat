import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const usePWADownload = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileByQuery = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const response = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(response && isMobileByQuery);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone;

    if (response && !isStandalone) {
      setShowModal(true);
    }
  }, [isMobileByQuery]);

  return {
    showModal,
    isMobile,
  };
};

export default usePWADownload;
