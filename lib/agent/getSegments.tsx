import { AGENT_API } from "../consts";

// eslint-disable-next-line
const getSegments = async (comments: any) => {
  try {
    const response = await fetch(`${AGENT_API}/api/get_segments`, {
      method: "POST",
      body: JSON.stringify(comments),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data.segments_with_icons;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getSegments;
