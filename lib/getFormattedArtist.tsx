import getSocialPlatformByLink from "./getSocialPlatformByLink";

// eslint-disable-next-line
const getFormattedArtist = (artist: any) => {
  const account_id = artist.artist_id;
  const account_info = artist.artist_info.account_info[0];
  const account_socials = artist.artist_info.account_socials.map(
    // eslint-disable-next-line
    (social: any) => ({
      ...social.social,
      link: social.social.profile_url,
      type: getSocialPlatformByLink(social.social.profile_url),
    }),
  );
  return {
    name: artist.artist_info.name,
    ...account_info,
    account_id,
    account_socials,
  };
};

export default getFormattedArtist;
