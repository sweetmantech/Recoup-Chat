import { ArtistRecord } from "@/types/Artist";
import getAggregatedSocials from "./getAggregatedSocials";

const getAggregatedProfile = (
  funnelType: string,
  artist: ArtistRecord,
  existingArtist: ArtistRecord | null,
) => {
  const aggregatedArtistProfile =
    funnelType === "wrapped" && existingArtist
      ? {
          ...artist,
          ...existingArtist,
          image: existingArtist?.image || artist?.image,
          account_socials: getAggregatedSocials([
            ...(existingArtist.account_socials || []),
            ...artist.account_socials,
          ]),
          isWrapped: true,
        }
      : artist;

  return aggregatedArtistProfile;
};

export default getAggregatedProfile;
