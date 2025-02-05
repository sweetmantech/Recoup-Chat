import { useArtistProvider } from "@/providers/ArtistProvider";
import { useEffect, useMemo, useState } from "react";
import trackAction from "@/lib/stack/trackAction";
import { useUserProvider } from "@/providers/UserProvder";
import useApprovedOrDeniedActions from "./useApprovedOrDeniedActions";
import useRunningAgents from "./useRunningAgents";
import useFansSegments from "./useFansSegments";
import useSocialActions from "./useSocialActions";
import useArtistComments from "./useArtistComments";
import useNewActions from "./useNewActions";

const useAutopilot = () => {
  const { selectedArtist } = useArtistProvider();
  const { address } = useUserProvider();
  const { curLiveAgent } = useRunningAgents();
  const { fansSegments, fansSegmentsAction } = useFansSegments();
  const { socialActions } = useSocialActions();
  const { comments, artistActions } = useArtistComments();
  const [actions, setActions] = useState<any>([]);
  const { existingActions, addExistingActions } = useApprovedOrDeniedActions();
  const { newActionUsed, newActions } = useNewActions(comments);

  const defaultActions = useMemo(
    () => [...fansSegmentsAction, ...socialActions, ...artistActions],
    [fansSegmentsAction, socialActions, artistActions],
  );

  const deny = async (index: number) => {
    const temp = [...actions];
    temp.splice(index, 1);
    setActions([...temp]);
    trackAction(
      address,
      actions[index],
      selectedArtist?.account_id || "",
      false,
    );
  };

  useEffect(() => {
    if (existingActions.length) {
      const filtered = defaultActions.filter(
        (action) => !existingActions.some((ele: any) => ele.id === action.id),
      );
      if (filtered.length < 3) {
        setActions([...newActions.slice(0, 3 - filtered.length), ...filtered]);
        return;
      }
      setActions(filtered);
    }
  }, [defaultActions, existingActions, comments, newActions.length]);

  return {
    actions,
    deny,
    comments,
    eventsLogs: existingActions,
    fansSegments,
    curLiveAgent,
    addExistingActions,
    newActionUsed,
  };
};

export default useAutopilot;
