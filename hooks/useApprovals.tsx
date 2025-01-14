import { useArtistProvider } from "@/providers/ArtistProvider";
import { SOCIAL_LINK } from "@/types/Agent";
import { useEffect, useState } from "react";

const useApprovals = () => {
  const [socials, setSocials] = useState<Array<string>>([]);
  const { selectedArtist } = useArtistProvider();

  const deny = (social: string) => {
    const temp = socials.filter((socialLink) => socialLink !== social);
    setSocials([...temp]);
  };

  useEffect(() => {
    if (selectedArtist) {
      const temp: Array<string> = [];
      selectedArtist?.artist_social_links?.map((link: SOCIAL_LINK) => {
        if (!link.link) temp.push(link.type);
      });
      setSocials([...temp]);
    }
  }, [selectedArtist]);

  return {
    socials,
    deny,
  };
};

export default useApprovals;
