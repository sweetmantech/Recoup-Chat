const getDefaultDataset = async (defaultDatasetId: string) => {
  try {
    const response = await fetch(
      `https://api.apify.com/v2/datasets/${defaultDatasetId}/items?token=${process.env.APIFY_TOKEN}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getDefaultDataset;
