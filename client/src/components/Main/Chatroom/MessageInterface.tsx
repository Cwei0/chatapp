import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Message } from "../../../types";
import { useCrud } from "../../../service";

export const MessageInterface = () => {
  const { serverId, channelId } = useParams();
  const [message, setMessage] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { fetchData } = useCrud<Message>({
    apiUrl: `messages/?channel_id=${channelId}`,
    initialData: [],
  });
  const socketUrl = channelId
    ? `ws://localhost:9000/${serverId}/${channelId}`
    : null;
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      setMessage([]);
      try {
        const data = await fetchData();
        setMessage(Array.isArray(data) ? data : []);
        console.log("Connected!");
      } catch (error) {
        console.error(error);
      }
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setMessage((prevMsg) => [...prevMsg, data.new_message]);
    },
  });
  return (
    <div>
      {message.map((msg, index) => (
        <div key={index}>
          <h4>{msg.sender}</h4>
          <p>{msg.content}</p>
        </div>
      ))}
      <form action="">
        <label htmlFor="">
          Enter Message:{" "}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendJsonMessage({ type: "message", newMessage });
                setNewMessage("");
              }
            }}
          />
        </label>
      </form>
      <button onClick={() => sendJsonMessage({ type: "message", newMessage })}>
        Send Message
      </button>
    </div>
  );
};
