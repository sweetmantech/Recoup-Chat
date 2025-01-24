import { COMMENT } from "@/types/Agent";
import getTwitterProfile from "./getTwitterProfile";
import getTiktokProfile from "./getTiktokProfile";

const getSocialProfiles = async (
  comments: Array<COMMENT>,
  // eslint-disable-next-line
  fansSegments: any,
) => {
  // eslint-disable-next-line
  const socialProfilesPromise = fansSegments.map(async (fanSegment: any) => {
    try {
      let profile = null;
      const handle = Object.keys(fanSegment)[0];
      const socialType = comments.find(
        (comment: COMMENT) => comment.username === handle,
      )?.type;
      if (socialType === "TWITTER") profile = await getTwitterProfile(handle);
      if (socialType === "TIKTOK") profile = await getTiktokProfile(handle);

      return profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const socialProfiles = await Promise.all(socialProfilesPromise);

  return socialProfiles;
};

export default getSocialProfiles;
