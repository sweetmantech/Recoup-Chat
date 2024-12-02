const uploadPfp = async (image: string) => {
  try {
    const response = await fetch("/api/upload/pfp", {
      method: "POST",
      body: JSON.stringify({ url: image }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.image;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default uploadPfp;
