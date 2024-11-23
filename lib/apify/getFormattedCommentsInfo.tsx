import { Comment } from "@/types/TikTok";

const getFormattedCommentsInfo = (data: Comment[]) => {
  let totalComments = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregated = {} as any;
  const sorteddata = data.sort(
    (a, b) => b?.createTime || 0 - a?.createTime || 0,
  );

  sorteddata.forEach((comment) => {
    const { videoWebUrl, text, uniqueId, createTime } = comment;

    if (!aggregated[videoWebUrl]) {
      aggregated[videoWebUrl] = {
        videoWebUrl,
        comments: [],
      };
    }

    if (text) {
      totalComments++;
      aggregated[videoWebUrl].comments.push({
        comment: text,
        username: uniqueId,
        created_at: createTime,
      });
    }
  });

  return {
    videos: Object.values(aggregated),
    totalComments,
  };
};

export default getFormattedCommentsInfo;
