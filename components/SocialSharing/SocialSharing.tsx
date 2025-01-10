import React, { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import useActivities from "@/hooks/useActivities";
import { Twitter, Download } from "lucide-react";
import { ONE_DAY_MILLISECONDS } from "@/lib/consts";
import useShareHeatMap from "@/hooks/useShareHeatMap";

const SocialSharing = () => {
  const today = new Date();
  const { activities } = useActivities();
  const { heatmap, download, tweets, loading } = useShareHeatMap();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [tooltipActive, setTooltipActive] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div className="w-full mt-4">
      {activities?.length > 0 && (
        <>
          <div ref={heatmap} className="relative">
            <HeatMap
              value={activities}
              width={600}
              weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
              startDate={new Date(today.getTime() - 330 * ONE_DAY_MILLISECONDS)}
              className="w-full"
              rectRender={(props, data) => {
                if (!data.count) return <rect {...props} />;
                return (
                  <rect
                    {...props}
                    onMouseOver={() => {
                      setX(Number(props?.x));
                      setY(Number(props?.y));
                      setTooltipContent(data.count.toString());
                      setTooltipActive(true);
                    }}
                    onMouseLeave={() => {
                      setTooltipActive(false);
                      setX(-1000000);
                      setY(-1000000);
                      setTooltipContent("");
                    }}
                  />
                );
              }}
            />
            {tooltipActive && (
              <div
                className="absolute px-1 bg-black text-white text-[9px] rounded-md"
                style={{
                  left: x + 23,
                  top: y - 2,
                }}
              >
                {tooltipContent}
              </div>
            )}
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
