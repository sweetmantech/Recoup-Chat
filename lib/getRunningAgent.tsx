const getRunningAgent = async (artistId: string) => {
  try {
    const response = await fetch(`/api/get_running_agent?artistId=${artistId}`);

    const data = await response.json();

    return data.agent;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default getRunningAgent;
