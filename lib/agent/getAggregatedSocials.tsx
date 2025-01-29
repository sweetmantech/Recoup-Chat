import { SOCIAL } from "@/types/Agent";

const getAggregatedSocials = (socialLinks: Array<SOCIAL>) => {
  const socialLinkMap = new Map<string, SOCIAL>();
  socialLinks.forEach((link) => {
    const existingSocial = socialLinkMap.get(link.type);
    const existingLink = existingSocial?.link;
    if (!existingLink) {
      socialLinkMap.set(link.type, link);
    }
  });

  const aggregatedLinks: SOCIAL[] = Array.from(socialLinkMap.values());

  return aggregatedLinks;
};

export default getAggregatedSocials;
