import { useArtistProvider } from "@/providers/ArtistProvider";
import { SOCIAL_LINK } from "@/types/Agent";
import { ACTION, ACTIONS } from "@/types/Autopilot";
import { useEffect, useState } from "react";
import useAnalysisActions from "./useAnalysisActions";
import trackAction from "@/lib/stack/trackAction";
import { useUserProvider } from "@/providers/UserProvder";
import useStackActions from "./useStackActions";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";

const useAutopilot = () => {
  const [socialActions, setSocialActions] = useState<Array<any>>([]);
  const { clearMessagesCache } = useInitialChatProvider();
  const { selectedArtist } = useArtistProvider();
  const { address } = useUserProvider();
  const {
    comments,
    analyses,
    segmentName,
    actions: analysisActions,
    funnelType,
    reportId,
  } = useAnalysisActions();
  const [actions, setActions] = useState<Array<ACTION>>([]);
  const { stackActions, getStackActions } = useStackActions();
  const eventsLogs = [...analyses, ...stackActions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  const deny = async (index: number) => {
    const temp = [...actions];
    temp.splice(index, 1);
    setActions([...temp]);
    await trackAction(address, actions[index], selectedArtist?.id || "", false);
    getStackActions();
  };

  useEffect(() => {
    if (selectedArtist) {
      const socialActionsTemp: any = [];
      selectedArtist?.artist_social_links?.map((link: SOCIAL_LINK) => {
        if (!link.link) {
          const socialAction = {
            type: ACTIONS.SOCIAL,
            title: `${link.type.toUpperCase()}: ${selectedArtist?.name}`,
            id: link.id,
          };
          socialActionsTemp.push(socialAction);
        }
      });
      setSocialActions(socialActionsTemp);
    }
  }, [selectedArtist]);

  useEffect(() => {
    clearMessagesCache();
    const temp = [...socialActions, ...analysisActions];
    const filtered = temp.filter((ele) => {
      const approvedIndex = stackActions.findIndex(
        (stackAction: any) => stackAction.metadata.id === ele.id,
      );
      if (approvedIndex >= 0) return false;
      return true;
    });
    setActions([...filtered]);
  }, [analysisActions, socialActions, stackActions]);

  return {
    actions,
    deny,
    comments,
    analyses,
    segmentName,
    funnelType,
    reportId,
    stackActions,
    eventsLogs,
    getStackActions,
  };
};

export default useAutopilot;
