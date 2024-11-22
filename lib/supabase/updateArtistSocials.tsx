import createSocialLink from "./createSocialLink";

const updateArtistSocials = async (
  artistId: string,
  tiktok_url: string,
  youtube_url: string,
  apple_url: string,
  instagram_url: string,
  twitter_url: string,
  spotify_url: string,
) => {
  await createSocialLink(artistId, "TIKTOK", tiktok_url);
  await createSocialLink(artistId, "YOUTUBE", youtube_url);
  await createSocialLink(artistId, "APPLE", apple_url);
  await createSocialLink(artistId, "INSTAGRAM", instagram_url);
  await createSocialLink(artistId, "TIWTTER", twitter_url);
  await createSocialLink(artistId, "SPOTIFY", spotify_url);
};

export default updateArtistSocials;
