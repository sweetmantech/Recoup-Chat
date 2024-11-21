import { Comment } from "@/types/TikTok";

const getFormattedCommentsInfo = (data: Comment[]) => {
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

    aggregated[videoWebUrl].comments.push(text);
    aggregated[videoWebUrl].usernames.push(uniqueId);
    aggregated[videoWebUrl].thumbnails.push(avatarThumbnail);
  });

  return Object.values(aggregated);
};

export default getFormattedCommentsInfo;
