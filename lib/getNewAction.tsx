// eslint-disable-next-line
const getNewAction = async (context: any) => {
  try {
    const response = await fetch("/api/get_action", {
      method: "POST",
      body: JSON.stringify({ context }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data.action;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getNewAction;
