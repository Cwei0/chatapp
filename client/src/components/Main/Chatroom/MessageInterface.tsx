import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Message, Server } from "../../../types";
import { useCrud } from "../../../service";

export const MessageInterface = () => {
  const { fetchData, data } = useCrud<Server>({
    apiUrl: "",
    initialData: [],
  });
  const [message, setMessage] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const { serverId, channelId } = useParams();
  const socketUrl = channelId
    ? `ws://localhost:9000/${serverId}/${channelId}`
    : null;
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      console.log(data);
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
