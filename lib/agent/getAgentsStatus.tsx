import getSocialPlatformByLink from "../getSocialPlatformByLink";

// eslint-disable-next-line
const getAgentsStatus = (agent: any) => {
  // eslint-disable-next-line
  return agent.agent_status.map((agent_status: any) => ({
    type: getSocialPlatformByLink(agent_status.social.profile_url),
    status: agent_status.status,
    progress: agent_status.progress,
  }));
};

export default getAgentsStatus;
