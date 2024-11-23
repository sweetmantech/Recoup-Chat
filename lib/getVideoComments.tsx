const getVideoComments = async (videoUrls: string) => {
  const response = await fetch(
    `/api/get_tiktok_video_comments?postURLs=${videoUrls}`,
  );
  const data = await response.json();
  const datasetId = data.data;

  while (1) {
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
    if (commentsInfo?.videos?.length && status === "SUCCEEDED")
      return commentsInfo;
  }
};

export default getVideoComments;
