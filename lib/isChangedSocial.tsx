import { SOCIAL_LINK } from "@/types/Agent";
import { ArtistRecord } from "@/types/Artist";

const findSocialLink = (links: SOCIAL_LINK[], type: string) =>
  links.find((link) => link.type === type)?.link;

const isChangedSocial = (
  updatedArtist: ArtistRecord,
  editableArtist: ArtistRecord | null,
) => {
  if (!editableArtist) return true;

  const existingArtistSocials = editableArtist.artist_social_links;
  const updatedArtistSocials = updatedArtist.artist_social_links;

  const existingLinks = {
    twitter: findSocialLink(existingArtistSocials, "TWITTER"),
    spotify: findSocialLink(existingArtistSocials, "SPOTIFY"),
    instagram: findSocialLink(existingArtistSocials, "INSTAGRAM"),
    tiktok: findSocialLink(existingArtistSocials, "TIKTOK"),
  };

  const updatedLinks = {
    twitter: findSocialLink(updatedArtistSocials, "TWITTER"),
    spotify: findSocialLink(updatedArtistSocials, "SPOTIFY"),
    instagram: findSocialLink(updatedArtistSocials, "INSTAGRAM"),
    tiktok: findSocialLink(updatedArtistSocials, "TIKTOK"),
  };

  return (
    existingLinks.twitter !== updatedLinks.twitter ||
    existingLinks.spotify !== updatedLinks.spotify ||
    existingLinks.instagram !== updatedLinks.instagram ||
    existingLinks.tiktok !== updatedLinks.tiktok
  );
};

export default isChangedSocial;
