import React from "react";
import HeatMap from "@uiw/react-heat-map";
import useSocialSharing from "@/hooks/useSocialSharing";

const SocialSharing = () => {
  const { startDate, activities } = useSocialSharing();
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
