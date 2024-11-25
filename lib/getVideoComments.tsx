import { STEP_OF_ANALYSIS } from "@/types/Thought";

const getVideoComments = async (
  videoUrls: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStatus?: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProgress?: any,
) => {
  if (getStatus) getStatus(STEP_OF_ANALYSIS.POSTURLS);
  const response = await fetch(
    `/api/get_tiktok_video_comments?postURLs=${videoUrls}`,
  );
  const data = await response.json();
  const datasetId = data.data;
  let attempts = 0;
  const maxAttempts = 30;
  let progress = 0;
  if (getStatus) getStatus(STEP_OF_ANALYSIS.VIDEO_COMMENTS);
  while (1) {
    attempts++;
    progress = (attempts / maxAttempts) * 100;
    if (updateProgress && progress < 100) updateProgress(progress);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const datasetItemsRes = await fetch(
      `/api/get_tiktok_video_comments/get_dataset_items?datasetId=${datasetId}`,
    );
    const datasetItems = await datasetItemsRes.json();
    const commentsInfo = datasetItems.data;
    const statusRes = await fetch(
      `/api/get_tiktok_video_comments/get_dataset_status?datasetId=${datasetId}`,
    );
    const statusInfo = await statusRes.json();
    const status = statusInfo.data;
    if (
      commentsInfo?.videos?.length &&
      (status === "SUCCEEDED" || progress > 95)
    ) {
      updateProgress(100);
      return commentsInfo;
    }
  }
};

export default getVideoComments;
