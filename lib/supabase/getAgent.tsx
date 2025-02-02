import { AGENT_API } from "../consts";

const getAgent = async (agentId: string) => {
  try {
    const response = await fetch(
      `${AGENT_API}/api/agentkit?agentId=${agentId}`,
    );
    const data = await response.json();

    return data.agent;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getAgent;
