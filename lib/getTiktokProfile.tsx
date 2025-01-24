import { AGENT_API } from "./consts";

const getTiktokProfile = async (handle: string) => {
  try {
    const response = await fetch(
      `${AGENT_API}/api/get_tiktok_profile?handle=${handle}`,
    );
    const data = await response.json();

    return data.profile;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getTiktokProfile;
