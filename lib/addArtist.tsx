const addArtist = async (email: string, artistId: string) => {
  try {
    const response = await fetch(
      `/api/account/add_artist?email=${encodeURIComponent(email || "")}&artistId=${artistId}`,
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default addArtist;
