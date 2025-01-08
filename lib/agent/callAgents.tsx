import { AGENT_API } from "../consts";

const callAgents = async (handle: string, type: string) => {
  try {
    const response = await fetch(
      `${AGENT_API}/api/autopilot?type=${type}&handle=${encodeURIComponent(handle)}`,
    );
    const data = await response.json();

    return data.pilotId;
  } catch (error) {
    return { error };
  }
};

export default callAgents;
