// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFormattedAccountInfo = (data: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregatedData = data.reduce((acc: any, item: any) => {
    const existingAuthor = acc.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (author: any) => author.name === item.authorMeta.name,
    );

    if (existingAuthor) {
      existingAuthor.videos.push(item.webVideoUrl);
    } else {
      acc.push({
        name: item.authorMeta.name,
        nickname: item.authorMeta.nickName,
        region: item.authorMeta.region,
        avatar: item.authorMeta.avatar,
        bioLink: item.authorMeta.bioLink,
        videos: [item.webVideoUrl],
        fans: item.authorMeta.fans,
        following: item.authorMeta.following,
      });
    }
    return acc;
  }, []);

  return Object.values(aggregatedData);
};

export default getFormattedAccountInfo;
