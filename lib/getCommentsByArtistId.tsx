const getCommentsByArtistId = async (artistId: string) => {
  try {
    const response = await fetch(`/api/comments?artistId=${artistId}`);

    const data = await response.json();

    return data?.comments || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getCommentsByArtistId;
