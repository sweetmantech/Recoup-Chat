// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const getFormattedPostsComments = (postsComments: any) => {
  let totalComments = 0;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const aggregated = {} as any;
  const sorteddata = postsComments.sort(
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (a: any, b: any) =>
      new Date(b?.createTime).getTime() ||
      0 - new Date(a?.createTime).getTime() ||
      0,
  );

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  sorteddata.forEach((post: any) => {
    const { postUrl, text, timestamp, ownerUsername } = post;

    if (!aggregated[postUrl]) {
      aggregated[postUrl] = {
        postUrl,
        comments: [],
      };
    }

    if (text) {
      totalComments++;
      aggregated[postUrl].comments.push({
        comment: text,
        username: ownerUsername,
        created_at: new Date(timestamp).getTime(),
      });
    }
  });

  return {
    videos: Object.values(aggregated),
    totalComments,
  };
};

export default getFormattedPostsComments;
