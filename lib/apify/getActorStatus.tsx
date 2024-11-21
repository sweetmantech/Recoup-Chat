const getActorStatus = async (defaultDatasetId: string) => {
  const response = await fetch(
    `https://api.apify.com/v2/actor-runs?token=${process.env.APIFY_TOKEN}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await response.json();

  const actorStatus = data.data.items.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => item.defaultDatasetId === defaultDatasetId,
  );
  return actorStatus[0].status;
};

export default getActorStatus;
