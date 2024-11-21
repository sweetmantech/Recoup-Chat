const getTiktokVideoComments = async (postURLs: string[]) => {
  try {
    const input = {
      postURLs,
      commentsPerPost: 100,
      maxRepliesPerComment: 0,
    };

    const response = await fetch(
      `https://api.apify.com/v2/acts/clockworks~tiktok-comments-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getTiktokVideoComments;
