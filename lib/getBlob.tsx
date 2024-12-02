import axios from "axios";

const getBlob = async (imageUrl: string) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });
    const type = response.headers["content-type"];
    const blob = new Blob([response.data], { type });

    return blob;
  } catch (error) {
    return { error };
  }
};

export default getBlob;
