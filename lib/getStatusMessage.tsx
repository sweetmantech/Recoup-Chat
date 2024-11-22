const getStatusMessage = (
  isSearchingTrends: boolean,
  isGettingVideos: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
) => {
  if (isSearchingTrends && context?.username) {
    return `Searching for @${context.username} videos on TikTok...`;
  }
  if (isGettingVideos) {
    return "Searching comments...";
  }
  return "is thinking...";
};

export default getStatusMessage;
