const getVideoComments = async (videoUrls: string) => {
  const response = await fetch(
    `/api/get_tiktok_video_comments?postURLs=${videoUrls}`,
  );
  const data = await response.json();
  const datasetId = data.data;
  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      `/api/get_tiktok_video_comments/get_dataset_items?datasetId=${datasetId}`,
    );
    const data = await response.json();
    if (data.length > 0) {
      return data.data;
    }
  }
};

export default getVideoComments;
