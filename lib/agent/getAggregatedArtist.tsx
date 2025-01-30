import { FUNNEL_ANALYSIS, SOCIAL } from "@/types/Agent";

const getAggregatedArtist = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  const {
    image,
    name,
    socials,
    account_id,
    followerCount,
    followingCount,
    bio,
  } = funnel_analyses
    .filter((ele) => ele.type)
    .reduce(
      // eslint-disable-next-line
      (acc: any, fa: FUNNEL_ANALYSIS) => {
        const account = fa.accounts;
        const account_info = account.account_info?.[0];
        const account_socials = account.account_socials;
        const profile =
          fa.funnel_analytics_accounts?.[0]?.accounts?.account_socials?.[0];
        acc.image = account_info?.image || acc.image || "";
        acc.name = account?.name || acc.name || "";
        acc.socials = [...acc.socials, ...account_socials];
        acc.account_id = account.id;
        acc.bio = profile?.bio || acc.bio || "";
        acc.followerCount += profile?.followerCount || 0;
        acc.followingCount += profile?.followingCount || 0;
        return acc;
      },
      {
        image: "",
        name: "",
        socials: [],
        followerCount: 0,
        followingCount: 0,
        bio: "",
      },
    );

  const socialLinkMap = new Map();
  socials.forEach((social: SOCIAL) => {
    if (!socialLinkMap.get(social.type) || social.link) {
      socialLinkMap.set(social.type, social);
    }
  });

  const aggregatedSocials = Array.from(socialLinkMap.values());

  return {
    image,
    name,
    instruction: "",
    label: "",
    account_socials: aggregatedSocials,
    knowledges: [],
    account_id,
    followerCount,
    followingCount,
    bio,
  };
};

export default getAggregatedArtist;
