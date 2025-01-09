import React from "react";
import HeatMap from "@uiw/react-heat-map";
import useActivities from "@/hooks/useActivities";
import { Twitter, Download } from "lucide-react";

const SocialSharing = () => {
  const { startDate, activities } = useActivities();
  return (
    <div className="w-full mt-4">
      {activities?.length > 0 && (
        <>
          <HeatMap
            value={activities}
            weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
            startDate={startDate}
            className="w-full"
          />
          <div className="flex gap-2 items-2 w-full justify-end">
            <button type="button" className="border p-1.5 rounded-full">
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
