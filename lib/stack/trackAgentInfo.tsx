import { Address } from "viem";
import getStackClient from "./getStackClient";
import { AGENT_RUN, CHAT_POINT_SYSTEM_ID, MESSAGE_SENT_POINT } from "../consts";

const trackAgentInfo = async (
  agentId: string,
  // eslint-disable-next-line
  metadata: any,
  address: Address,
) => {
  try {
    const stackClient = getStackClient(CHAT_POINT_SYSTEM_ID);
    const uniqueId = `${address}-${Date.now()}`;
    const eventName = `${AGENT_RUN}-${agentId}`;
    await stackClient.track(eventName, {
      points: MESSAGE_SENT_POINT,
      account: address,
      uniqueId,
      metadata,
    });
  } catch (error) {
    return { error };
  }
};

export default trackAgentInfo;
