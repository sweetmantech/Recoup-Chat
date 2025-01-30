import { FUNNEL_ANALYSIS } from "@/types/Agent";

const getAggregatedSocialProfile = (funnelAnalyses: Array<FUNNEL_ANALYSIS>) => {
  const { name, username, region, avatar, bio, followerCount, followingCount } =
    funnelAnalyses
      .filter((ele) => ele.type)
      .reduce(
        (acc, fa) => {
          const profile =
            fa.funnel_analytics_accounts?.[0]?.accounts?.account_socials?.[0];
          acc.name = profile?.username || acc.username || "";
          acc.username = profile?.username || acc.username || "";
          acc.region = profile?.region || acc.region || "";
          acc.avatar = profile?.avatar || acc.avatar || "";
          acc.bio = profile?.bio || acc.bio || "";
          acc.followerCount += profile?.followerCount || 0;
          acc.followingCount += profile?.followingCount || 0;
          return acc;
        },
        {
          username: "",
          name: "",
          region: "",
          avatar: "",
          bio: "",
          followerCount: 0,
          followingCount: 0,
        },
      );

  return { username, name, region, avatar, bio, followerCount, followingCount };
};

export default getAggregatedSocialProfile;
