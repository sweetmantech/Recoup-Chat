import { SOCIAL_LINK } from "@/types/Agent";

const getAggregatedSocials = (socialLinks: Array<SOCIAL_LINK>) => {
  const socialLinkMap = new Map<string, SOCIAL_LINK>();
  socialLinks.forEach((link) => {
    const existingSocial = socialLinkMap.get(link.type);
    const existingLink = existingSocial?.link;
    if (!existingLink) {
      socialLinkMap.set(link.type, link);
    }
  });

  const aggregatedLinks: SOCIAL_LINK[] = Array.from(socialLinkMap.values());

  return aggregatedLinks;
};

export default getAggregatedSocials;
