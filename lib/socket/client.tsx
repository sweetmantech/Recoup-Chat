import { AGENT_API } from "../consts";
import { io } from "socket.io-client";

const socketIo = io(AGENT_API);

export default socketIo;
