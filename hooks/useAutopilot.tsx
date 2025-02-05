import { useArtistProvider } from "@/providers/ArtistProvider";
import { ACTION, ACTIONS } from "@/types/Autopilot";
import { useEffect, useState } from "react";
import trackAction from "@/lib/stack/trackAction";
import { useUserProvider } from "@/providers/UserProvder";
import useStackActions from "./useStackActions";
import useRunningAgents from "./useRunningAgents";
import useFansSegments from "./useFansSegments";
import useSocialActions from "./useSocialActions";
import useArtistComments from "./useArtistComments";

const useAutopilot = () => {
  const { selectedArtist } = useArtistProvider();
  const { address, email } = useUserProvider();
  const { curLiveAgent } = useRunningAgents();
  const { fansSegments } = useFansSegments();
  const { socialActions } = useSocialActions();
  const { comments } = useArtistComments();
  const [actions, setActions] = useState<Array<ACTION>>([]);
  const { stackActions, getStackActions } = useStackActions();
  const eventsLogs = stackActions;

  const deny = async (index: number) => {
    const temp = [...actions];
    temp.splice(index, 1);
    setActions([...temp]);
    await trackAction(
      address,
      actions[index],
      selectedArtist?.account_id || "",
      false,
      {},
    );
    getStackActions();
  };

  useEffect(() => {
    const temp = [...socialActions];
    if (comments.length) {
      temp.push({
        type: ACTIONS.POST_REACTION,
        title: "Post Reaction",
        id: ACTIONS.POST_REACTION,
      });
      temp.push({
        type: ACTIONS.CONTENT_CALENDAR,
        title: "Content Calendar",
        id: ACTIONS.CONTENT_CALENDAR,
      });
    }
    if (fansSegments.length)
      setActions([
        ...temp,
        {
          type: ACTIONS.FANS_PROFILES,
          title: "Export Fans Profiles",
          id: ACTIONS.FANS_PROFILES,
        },
      ]);
  }, [socialActions, stackActions, fansSegments, email, comments]);

  return {
    actions,
    deny,
    comments,
    stackActions,
    eventsLogs,
    getStackActions,
    fansSegments,
    curLiveAgent,
  };
};

export default useAutopilot;
