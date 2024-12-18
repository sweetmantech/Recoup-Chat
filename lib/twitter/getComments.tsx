import { AGENT_API } from "../consts";

const getComments = async (handle: string) => {
  const response = await fetch(`${AGENT_API}/api/get_tweets?handle=${handle}`);
  if (!response.ok) throw Error("failed!");
  const data = await response.json();

  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data?.tweets?.map((tweet: any) => ({
    comment: tweet.text,
    created_at: new Date(tweet.createdAt).getTime(),
    username: tweet.username,
  }));
};

export default getComments;
