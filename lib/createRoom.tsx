import getAiTitle from "./getAiTitle";

const createRoom = async (account_id: string, content: string) => {
  try {
    const title = await getAiTitle(content);
    const topic = title.replaceAll(`\"`, "");
    const response = await fetch(
      `/api/room/create?account_id=${account_id}&topic=${encodeURIComponent(topic)}`,
    );
    const data = await response.json();
    return {
      id: data.new_room.id,
      topic,
      account_id,
    };
  } catch (error) {
    console.error(error);
    return {
      id: "",
      topic: "",
      account_id: "",
    };
  }
};

export default createRoom;
