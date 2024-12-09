import { STEP_OF_ANALYSIS } from "@/types/Thought";
import { AGENT_API } from "./consts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getTikTokProfile = async (handle: string, setThought?: any) => {
  const response = await fetch(
    `${AGENT_API}/api/get_tiktok_account_trends?handle=${handle}`,
  );
  if (!response.ok) throw Error("failed!");
  const data = await response.json();
  const datasetId = data.data;

  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (setThought) setThought(STEP_OF_ANALYSIS.PROFILE);
    const datasetItemsRes = await fetch(
      `${AGENT_API}/api/get_tiktok_account_trends/get_dataset_items?datasetId=${datasetId}`,
    );
    if (!datasetItemsRes.ok) throw Error("failed!");
    const datasetItems = await datasetItemsRes.json();
    const profileInfo = datasetItems.data;
    const statusRes = await fetch(
      `${AGENT_API}/api/get_tiktok_account_trends/get_dataset_status?datasetId=${datasetId}`,
    );
    const statusInfo = await statusRes.json();
    const status = statusInfo.data;
    if (profileInfo && status === "SUCCEEDED") return profileInfo;
  }
};

export default getTikTokProfile;
