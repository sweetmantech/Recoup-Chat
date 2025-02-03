import { Address, getAddress } from "viem";
import getStackClient from "./getStackClient";
import { AGENT_RUN, CHAT_POINT_SYSTEM_ID } from "../consts";
import getSegments from "../agent/getSegments";
import trackAgentInfo from "./trackAgentInfo";

const getAgentsInfoFromStack = async (
  agentId: string,
  // eslint-disable-next-line
  comments: any,
  address: Address,
) => {
  const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);

  // eslint-disable-next-line
  const agentsInfo: any = await stackClient.getEvents({
    query: stackClient
      .eventsQuery()
      .where({
        eventType: `${AGENT_RUN}-${agentId}`,
        associatedAccount: getAddress(address),
      })
      .limit(1)
      .offset(0)
      .build(),
  });

  if (agentsInfo.length) {
    if (agentsInfo[0]?.metadata?.segments?.length)
      return agentsInfo[0].metadata;
  }
  const segments = await getSegments(comments);
  // eslint-disable-next-line
  const commentIds = comments.map((comment: any) => comment.id);
  await trackAgentInfo(
    agentId,
    {
      commentIds,
      segments,
    },
    address,
  );
  if (segments.length)
    return {
      segments,
      commentIds,
    };

  return {
    segments: [],
    commentIds: [],
  };
};

export default getAgentsInfoFromStack;
