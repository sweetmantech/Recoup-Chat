import { AGENT_API } from "../consts";

// eslint-disable-next-line
const callAgentApi = async (handles: any, type: string, artistId: string) => {
  try {
    const response = await fetch(`${AGENT_API}/api/agentkit/run`, {
      method: "POST",
      body: JSON.stringify({ handles, type, artistId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const agentId = data?.agentId;

    return agentId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default callAgentApi;
