import { useEffect, useState } from "react";
import { SOCIAL } from "@/types/Agent";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { ACTIONS } from "@/types/Autopilot";
import { useUserProvider } from "@/providers/UserProvder";
import { SOCIAL_DEFAULT_PLATFORMS } from "@/lib/consts";

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
      SOCIAL_DEFAULT_PLATFORMS.map((social) => {
        const existingSocial = selectedArtist?.account_socials?.find(
          (account_social: SOCIAL) =>
            account_social?.type?.toLowerCase() === social.toLowerCase(),
        );
        if (!existingSocial) {
          const socialAction = {
            type: ACTIONS.SOCIAL,
            title: `${social}: ${selectedArtist?.name}`,
            id: social,
            timestamp: new Date().getTime(),
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
