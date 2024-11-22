const getVideoComments = async (videoUrls: string) => {
  const response = await fetch(
    `/api/get_tiktok_video_comments?postURLs=${videoUrls}`,
  );
  const data = await response.json();
  const datasetId = data.data;

  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    let response = await fetch(
      `/api/get_tiktok_video_comments/get_dataset_items?datasetId=${datasetId}`,
    );
    let data = await response.json();
    const videos = data.data.videos;
    response = await fetch(
      `/api/get_tiktok_video_comments/get_dataset_status?datasetId=${datasetId}`,
    );
    data = await response.json();
    const status = data.data;
    if (videos?.length && status === "SUCCEED") return data.data;
  }
};

export default getVideoComments;
