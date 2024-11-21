import { Comment } from "@/types/TikTok";

const getFormattedCommentsInfo = (data: Comment[]) => {
  let totalComments = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregated = {} as any;
  const sorteddata = data.sort(
    (a, b) => b?.createTime || 0 - a?.createTime || 0,
  );

  sorteddata.forEach((comment) => {
    const { videoWebUrl, text, uniqueId, avatarThumbnail } = comment;

    if (!aggregated[videoWebUrl]) {
      aggregated[videoWebUrl] = {
        videoWebUrl,
        comments: [],
        usernames: [],
        thumbnails: [],
      };
    }

    if (text) {
      totalComments++;
      aggregated[videoWebUrl].comments.push(text);
    }
    aggregated[videoWebUrl].usernames.push(uniqueId);
    if (avatarThumbnail) {
      aggregated[videoWebUrl].thumbnails.push(avatarThumbnail);
    }
  });

  return {
    commentsInfo: Object.values(aggregated),
    totalComments,
  };
};

export default getFormattedCommentsInfo;
