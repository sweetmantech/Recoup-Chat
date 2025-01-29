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
          artist_account_socials: getAggregatedSocials([
            ...(existingArtist.artist_account_socials || []),
            ...artist.artist_account_socials,
          ]),
          isWrapped: true,
        }
      : artist;

  return aggregatedArtistProfile;
};

export default getAggregatedProfile;
