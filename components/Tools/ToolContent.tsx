import Artist from "./Artist";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import Campaign from "./Campaign";

const ToolContent = () => {
  const { toolName } = useToolCallProvider();

  return (
    <div>
      {(toolName === "getArtists" ||
        toolName === "getArtistAnalysis" ||
        toolName === "getVideosInfo" ||
        toolName === "updateArtistInfo") && <Artist />}
      {(toolName === "createCampaign" || toolName === "getCampaigns") && (
        <Campaign />
      )}
    </div>
  );
};

export default ToolContent;
