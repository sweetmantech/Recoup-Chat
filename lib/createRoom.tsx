import getAiTitle from "./getAiTitle";

const createRoom = async (account_id: string, content: string, artist_id?: string) => {
  try {
    const title = await getAiTitle(content);
    const topic = title.replaceAll(`\"`, "");
    const url = new URL(`/api/room/create`, window.location.origin);
    url.searchParams.append("account_id", account_id);
    url.searchParams.append("topic", topic);
    
    if (artist_id) {
      url.searchParams.append("artist_id", artist_id);
    }
    
    const response = await fetch(url.toString());
    const data = await response.json();
    return data.new_room;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default createRoom;
