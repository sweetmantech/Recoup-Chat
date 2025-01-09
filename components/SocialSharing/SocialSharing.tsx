import React from "react";
import HeatMap from "@uiw/react-heat-map";
import useActivities from "@/hooks/useActivities";

const SocialSharing = () => {
  const { startDate, activities } = useActivities();
  return (
    <div className="w-full mt-4">
      {activities?.length > 0 && (
        <HeatMap
          value={activities}
          weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
          startDate={startDate}
          className="w-full"
        />
      )}
    </div>
  );
};

export default SocialSharing;
