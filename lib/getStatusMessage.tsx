const getStatusMessage = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any,
) => {
  if (context?.username) {
    return `Searching for @${context.username} videos on TikTok...`;
  }
  return "is thinking...";
};

export default getStatusMessage;
