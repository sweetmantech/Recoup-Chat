import saveAnalysis from "./saveAnalysis";

const saveTiktokAnalysis = async (
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileWithComments: any,
  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  fanSegmentsWithIcons: any,
  artistId: string,
  chatId: string,
) => {
  while (1) {
    const data = await saveAnalysis({
      ...profileWithComments,
      segments: [...fanSegmentsWithIcons],
      chat_id: chatId,
      artistId,
    });
    if (data) {
      return {
        ...profileWithComments,
        id: data.id,
      };
    }
  }
};

export default saveTiktokAnalysis;
