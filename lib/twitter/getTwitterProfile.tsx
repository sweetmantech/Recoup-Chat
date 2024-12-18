import { AGENT_API } from "../consts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTwitterProfile = async (handle: string) => {
  const response = await fetch(
    `${AGENT_API}/api/get_twitter_profile?handle=${handle}`,
  );
  if (!response.ok) {
    const error = await response.text();
    return { error };
  }

  const data = await response.json();
  const profile = data.profile;

  return {
    avatar: profile.avatar,
    bio: profile.biography,
    fans: profile.followersCount,
    following: profile.followingCount,
    name: profile.username,
    nickname: profile.name,
    region: profile.location,
  };
};

export default getTwitterProfile;
