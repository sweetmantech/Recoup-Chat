import { FUNNEL_ANALYSIS, SOCIAL } from "@/types/Agent";

const getAggregatedArtist = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  const { image, name, socials, account_id } = funnel_analyses
    .filter((ele) => ele.type)
    .reduce(
      // eslint-disable-next-line
      (acc: any, fa: FUNNEL_ANALYSIS) => {
        const account = fa.accounts;
        const account_info = account.account_info?.[0];
        const account_socials = account.account_socials;
        acc.image = account_info?.image || acc.image || "";
        acc.name = account?.name || acc.name || "";
        acc.socials = [...acc.socials, ...account_socials];
        acc.account_id = account.id;
        return acc;
      },
      { image: "", name: "", socials: [] },
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
  };
};

export default getAggregatedArtist;
