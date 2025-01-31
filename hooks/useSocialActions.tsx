import { useEffect, useState } from "react";
import { SOCIAL } from "@/types/Agent";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { ACTIONS } from "@/types/Autopilot";
import { useUserProvider } from "@/providers/UserProvder";

const useSocialActions = () => {
  const [socialActions, setSocialActions] = useState<Array<any>>([]);
  const { selectedArtist } = useArtistProvider();
  const { email } = useUserProvider();

  useEffect(() => {
    if (!email) {
      setSocialActions([]);
      return;
    }
    if (selectedArtist) {
      const socialActionsTemp: any = [];
      selectedArtist?.account_socials?.map((link: SOCIAL) => {
        if (!link.link && link?.type) {
          const socialAction = {
            type: ACTIONS.SOCIAL,
            title: `${link?.type?.toUpperCase()}: ${selectedArtist?.name}`,
            id: link.id,
          };
          socialActionsTemp.push(socialAction);
        }
      });
      setSocialActions(socialActionsTemp);
    }
  }, [selectedArtist, email]);

  return {
    socialActions,
  };
};

export default useSocialActions;
