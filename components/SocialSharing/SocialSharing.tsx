import React, { useEffect, useRef, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import useActivities from "@/hooks/useActivities";
import { Twitter, Download } from "lucide-react";
import domtoimage from "dom-to-image";
import { uploadFile } from "@/lib/ipfs/uploadToIpfs";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";

const SocialSharing = () => {
  const { startDate, activities } = useActivities();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heatmap = useRef() as any;
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blob, setBlob] = useState<any>(null);

  const download = async () => {
    if (!blob) return;
    setLoading(true);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "heatmap.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(false);
  };

  const tweets = async () => {
    if (!blob) return;
    setLoading(true);
    const fileName = "heatmap.png";
    const fileType = "image/png";
    const mapFile = new File([blob], fileName, { type: fileType });
    const { cid } = await uploadFile(mapFile);
    const tweetLink = `https://x.com/intent/tweet?text=${encodeURIComponent(getIpfsLink(`ipfs://${cid}`))}`;
    window.open(tweetLink, "_blank");
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const domBlob = await domtoimage.toBlob(heatmap.current);
      setBlob(domBlob);
    };
    if (!heatmap.current) return;
    init();
  }, [heatmap.current]);

  return (
    <div className="w-full mt-4">
      {activities?.length > 0 && (
        <>
          <div ref={heatmap}>
            <HeatMap
              value={activities}
              weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
              startDate={startDate}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 items-2 w-full justify-end">
            <button
              type="button"
              className="border p-1.5 rounded-full"
              onClick={download}
              disabled={loading}
            >
              <Download className="size-4" />
            </button>
            <button
              type="button"
              className="border p-1.5 rounded-full"
              disabled={loading}
              onClick={tweets}
            >
              <Twitter className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialSharing;
