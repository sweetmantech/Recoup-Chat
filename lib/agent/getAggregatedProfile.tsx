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
          artist_social_links: getAggregatedSocials([
            ...artist.artist_social_links,
            ...(existingArtist.artist_social_links || []),
          ]),
          isWrapped: true,
        }
      : artist;

  return aggregatedArtistProfile;
};

export default getAggregatedProfile;
