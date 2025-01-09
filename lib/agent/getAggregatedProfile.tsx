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
          image: artist?.image || existingArtist?.image,
          artist_social_links: getAggregatedSocials([
            ...(existingArtist.artist_social_links || []),
            ...artist.artist_social_links,
          ]),
          isWrapped: true,
        }
      : artist;

  return aggregatedArtistProfile;
};

export default getAggregatedProfile;
