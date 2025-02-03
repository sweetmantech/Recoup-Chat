const getAggregatedAgentSocials = async (agentId: string) => {
  try {
    const response = await fetch(`/api/agent?agentId=${agentId}`);

    const data = await response.json();
    const agent = data?.data;

    if (!agent)
      return {
        username: null,
        avatar: null,
        followerCount: 0,
      };

    const followerCount = agent.agent_status.reduce(
      // eslint-disable-next-line
      (sum: any, ele: any) => sum + ele.social.followerCount,
    );
    const username =
      agent.agent_status.find(
        // eslint-disable-next-line
        (ele: any) => ele.social.username,
      )?.[0]?.username || "";
    const avatar =
      // eslint-disable-next-line
      agent.agent_status.find((ele: any) => ele.social.avatar)?.[0]?.avatar ||
      "";

    return {
      username,
      followerCount,
      avatar,
    };
  } catch (error) {
    console.error(error);
    return {
      username: null,
      avatar: null,
      followerCount: 0,
    };
  }
};

export default getAggregatedAgentSocials;
