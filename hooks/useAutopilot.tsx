import { useArtistProvider } from "@/providers/ArtistProvider";
import { SOCIAL_LINK } from "@/types/Agent";
import { ACTIONS } from "@/types/Autopilot";
import { useEffect, useState } from "react";
import useAnalysisActions from "./useAnalysisActions";

const useAutopilot = () => {
  const [actions, setActions] = useState<Array<any>>([]);
  const { selectedArtist } = useArtistProvider();
  const {
    comments,
    analyses,
    segmentName,
    actions: analysisActions,
    funnelType,
    reportId,
  } = useAnalysisActions();

  const deny = (index: number) => {
    const temp = [...actions];
    temp.splice(index, 1);
    setActions([...temp]);
  };

  const addAction = (action: any) => {
    const temp = [...actions];
    const findIndex = temp.findIndex((ele) => ele.id === action?.id);
    if (findIndex >= 0) return;
    temp.push(action);
    setActions([...temp]);
  };

  useEffect(() => {
    if (selectedArtist) {
      selectedArtist?.artist_social_links?.map((link: SOCIAL_LINK) => {
        if (!link.link) {
          addAction({
            type: ACTIONS.SOCIAL,
            label: `${link.type.toUpperCase()}: ${selectedArtist?.name}`,
            id: link.id,
          });
        }
      });
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (analysisActions.length > 0)
      setActions([...actions, ...analysisActions]);
  }, [analysisActions]);

  return {
    actions,
    deny,
    comments,
    analyses,
    segmentName,
    funnelType,
    reportId,
  };
};

export default useAutopilot;
