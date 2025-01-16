import { FUNNEL_ANALYSIS, SOCIAL_LINK } from "@/types/Agent";

const getAggregatedArtist = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  const socialLinks = funnel_analyses.reduce((acc, fa: FUNNEL_ANALYSIS) => {
    const profile = fa.funnel_analytics_profile?.[0];
    return profile && profile.artists && profile.artists.artist_social_links
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        acc.concat(profile.artists.artist_social_links as any)
      : acc;
  }, []);

  const socialLinkMap = new Map();
  socialLinks.forEach((link: SOCIAL_LINK) => {
    if (!socialLinkMap.get(link.type) || link.link) {
      socialLinkMap.set(link.type, link);
    }
  });

  const aggregatedLinks = Array.from(socialLinkMap.values());

  const { image, name } = funnel_analyses.reduce(
    (acc, fa) => {
      const profile = fa.funnel_analytics_profile?.[0] || {};
      acc.image = profile.avatar || profile.artists.image || acc.image || "";
      acc.name = profile.nickname || profile.artists.name || acc.name || "";
      return acc;
    },
    { image: "", name: "" },
  );

  return {
    id: funnel_analyses?.[0]?.funnel_analytics_profile?.[0].artistId || "",
    image,
    name,
    instruction: "",
    label: "",
    artist_social_links: aggregatedLinks,
    bases: [],
    knowledges: [],
  };
};

export default getAggregatedArtist;
