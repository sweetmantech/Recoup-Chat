import { useArtistProvider } from "@/providers/ArtistProvider";
import { SOCIAL_LINK } from "@/types/Agent";
import { ACTIONS } from "@/types/Autopilot";
import { useEffect, useState } from "react";
import useAnalysisActions from "./useAnalysisActions";

const useAutopilot = () => {
  const [socialActions, setSocialActions] = useState<Array<any>>([]);
  const { selectedArtist } = useArtistProvider();
  const {
    comments,
    analyses,
    segmentName,
    actions: analysisActions,
    funnelType,
    reportId,
  } = useAnalysisActions();
  const [actions, setActions] = useState<Array<any>>([]);

  const deny = (index: number) => {
    const temp = [...actions];
    temp.splice(index, 1);
    setActions([...temp]);
  };

  useEffect(() => {
    if (selectedArtist) {
      const socialActionsTemp: any = [];
      selectedArtist?.artist_social_links?.map((link: SOCIAL_LINK) => {
        if (!link.link) {
          const socialAction = {
            type: ACTIONS.SOCIAL,
            label: `${link.type.toUpperCase()}: ${selectedArtist?.name}`,
            id: link.id,
          };
          socialActionsTemp.push(socialAction);
        }
      });
      setSocialActions(socialActionsTemp);
    }
  }, [selectedArtist]);

  useEffect(() => {
    if (analysisActions.length > 0)
      setActions([...socialActions, ...analysisActions]);
  }, [analysisActions, socialActions]);

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
