const getArtist = async (artistId: string) => {
  try {
    const response = await fetch(`/api/artist?artistId=${artistId}`);

    const data = await response.json();

    return data?.artist;
  } catch (error) {
    return { error };
  }
};

export default getArtist;
