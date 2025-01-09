import { AGENT_API } from "./consts";

const getHandles = async (handle: string) => {
  try {
    const response = await fetch(
      `${AGENT_API}/api/get_social_handles?handle=${encodeURIComponent(handle)}`,
    );
    if (!response.ok)
      return {
        spotify: "",
        twitter: "",
        instagram: "",
        tiktok: "",
      };
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return {
      spotify: "",
      twitter: "",
      instagram: "",
      tiktok: "",
    };
  }
};

export default getHandles;
