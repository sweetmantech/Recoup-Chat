import client from "./client";

const getTiktokVideoComments = async (postURLs: string[]) => {
  try {
    const input = {
      postURLs,
      commentsPerPost: 100,
      maxRepliesPerComment: 0,
    };

    const run = await client
      .actor("clockworks/tiktok-comments-scraper")
      .call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getTiktokVideoComments;
