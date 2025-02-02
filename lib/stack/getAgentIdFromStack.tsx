import { Address, getAddress } from "viem";
import getStackClient from "./getStackClient";
import { AGENT_RUN, CHAT_POINT_SYSTEM_ID } from "../consts";

const getAgentIdFromStack = async (
  analysisId: string,
  walletAddress: Address,
) => {
  const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);

  const agents = await stackClient.getEvents({
    query: stackClient
      .eventsQuery()
      .where({
        eventType: `${AGENT_RUN}-${analysisId}`,
        associatedAccount: getAddress(walletAddress),
      })
      .limit(1)
      .offset(0)
      .build(),
  });

  if (agents.length) return agents[0].metadata.agentId;
  return null;
};

export default getAgentIdFromStack;
