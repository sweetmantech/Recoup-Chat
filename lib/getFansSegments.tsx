import { AGENT_API } from "./consts";

const getFansSegments = async (chatId: string) => {
  try {
    const response = await fetch(
      `${AGENT_API}/api/get_fans_segments?reportId=${chatId}`,
    );

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getFansSegments;
