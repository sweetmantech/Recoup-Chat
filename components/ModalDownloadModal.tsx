"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MobileDownloadModal = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      setIsVisible(true);
      e.preventDefault();
      setDeferredPrompt(e);
    };
    if (isMobile) {
      setIsVisible(true);
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-60" />
          <div className="relative bg-white p-4 rounded-md shadow-lg w-4/5 z-10 flex flex-col items-center">
            <Image
              src="/savePhoneIcon.png"
              alt="save phone icon"
              width={100}
              height={100}
            />
            <h2 className="text-lg font-bold mb-2 text-center">
              Add to Home Screen
            </h2>
            <button
              className="border-2 px-4 py-2 rounded-xl border-grey-700"
              onClick={handleInstallClick}
            >
              Download
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileDownloadModal;
