// eslint-disable-next-line @typescript-eslint/no-explicit-any
const runTikTokActor = async (input: any) => {
  try {
    const response = await fetch(
      `https://api.apify.com/v2/acts/clockworks~tiktok-comments-scraper/runs?token=${process.env.APIFY_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
    );

    const data = await response.json();
    const defaultDatasetId = data.data.defaultDatasetId;

    return defaultDatasetId;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default runTikTokActor;
