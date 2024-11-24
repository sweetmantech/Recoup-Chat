const getTikTokProfile = async (handle: string) => {
  console.log(handle);
  // const response = await fetch(
  //   `/api/get_tiktok_account_trends?handle=${handle}`,
  // );
  // const data = await response.json();
  const datasetId = "g6gCQvOZZ2vCtwiao";

  while (1) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const datasetItemsRes = await fetch(
      `/api/get_tiktok_account_trends/get_dataset_items?datasetId=${datasetId}`,
    );
    const datasetItems = await datasetItemsRes.json();
    const profileInfo = datasetItems.data;
    const statusRes = await fetch(
      `/api/get_tiktok_account_trends/get_dataset_status?datasetId=${datasetId}`,
    );
    const statusInfo = await statusRes.json();
    const status = statusInfo.data;
    if (profileInfo && status === "SUCCEEDED") return profileInfo;
  }
};

export default getTikTokProfile;
