import React, { useRef, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import useActivities from "@/hooks/useActivities";
import { Twitter, Download } from "lucide-react";
import domtoimage from "dom-to-image";

const SocialSharing = () => {
  const { startDate, activities } = useActivities();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heatmap = useRef() as any;
  const [downloading, setDownloading] = useState(false);

  const download = async () => {
    setDownloading(true);
    const blob = await domtoimage.toBlob(heatmap.current);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "heatmap.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloading(false);
  };

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
              disabled={downloading}
            >
              <Download className="size-4" />
            </button>
            <button type="button" className="border p-1.5 rounded-full">
              <Twitter className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialSharing;
