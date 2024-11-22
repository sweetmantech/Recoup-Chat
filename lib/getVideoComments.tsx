const getVideoComments = async (videoUrls: string) => {
  const response = await fetch(
    `/api/get_tiktok_video_comments?postURLs=${videoUrls}`,
  );
  const data = await response.json();
  const datasetId = data.data;
  let hasComments = false;

  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    const response = await fetch(
      `/api/get_tiktok_video_comments/get_dataset_items?datasetId=${datasetId}`,
    );
    const data = await response.json();
    if (hasComments) return data.data;
    if (data.data.videos.length > 0) hasComments = true;
  }
};

export default getVideoComments;
