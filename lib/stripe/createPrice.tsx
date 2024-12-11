export const createPrice = async (productName: string, price: string) => {
  try {
    const response = await fetch(
      `/api/stripe/create_price?productName=${encodeURIComponent(productName)}&price=${price}`,
    );

    const data = await response.json();
    return data.data;
  } catch (error) {
    return { error };
  }
};
