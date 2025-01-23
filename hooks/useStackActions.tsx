import { ACTION_EVENT } from "@/lib/consts";
import getActions from "@/lib/stack/getActions";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useCallback, useEffect, useState } from "react";

const useStackActions = () => {
  const { selectedArtist } = useArtistProvider();
  const { address } = useUserProvider();
  const [actions, setActions] = useState<any>([]);

  const getStackActions = useCallback(async () => {
    if (!selectedArtist?.id || !address) return;
    const events = await getActions(
      `${ACTION_EVENT}-${selectedArtist?.id}`,
      address,
    );
    setActions(events);
  }, [selectedArtist, address]);

  useEffect(() => {
    getStackActions();
  }, [getStackActions]);

  return {
    stackActions: actions,
    getStackActions,
  };
};

export default useStackActions;
