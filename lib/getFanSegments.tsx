// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFanSegments = async (context: any) => {
  const response = await fetch(`/api/segments`, {
    method: "POST",
    body: JSON.stringify(context),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  console.log("ZIAD", data);
  return data;
};

export default getFanSegments;
