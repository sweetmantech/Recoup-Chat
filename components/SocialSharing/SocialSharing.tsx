import React from "react";
import HeatMap from "@uiw/react-heat-map";
import useActivities from "@/hooks/useActivities";
import { Twitter, Download } from "lucide-react";
import { ONE_DAY_MILLISECONDS } from "@/lib/consts";
import Tooltip from "@uiw/react-tooltip";
import useShareHeatMap from "@/hooks/useShareHeatMap";

const SocialSharing = () => {
  const today = new Date();
  const { activities } = useActivities();
  const { heatmap, download, tweets, loading } = useShareHeatMap();

  return (
    <div className="w-full mt-4">
      {activities?.length > 0 && (
        <>
          <div ref={heatmap}>
            <HeatMap
              value={activities}
              weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
              startDate={new Date(today.getTime() - 330 * ONE_DAY_MILLISECONDS)}
              className="w-full"
              rectRender={(props, data) => {
                return (
                  <Tooltip placement="top" content={`${data.count || 0}`}>
                    <rect {...props} />
                  </Tooltip>
                );
              }}
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
