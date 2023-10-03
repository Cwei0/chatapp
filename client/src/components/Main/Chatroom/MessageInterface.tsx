import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import { Message, Server } from "../../../types";
import { useCrud } from "../../../service";
import { Box, Typography } from "@mui/material";
import { MessageInterfaceChannels } from ".";

type Props = {
  data: Array<Server>;
};

export const MessageInterface = ({ data }: Props) => {
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
    <>
      <MessageInterfaceChannels data={data} />
      {channelId == undefined ? (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: "calc(80vh)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" }}
            >
              Welcome to {data?.[0]?.name ?? "Server"}
            </Typography>
            <Typography>
              {data?.[0]?.description ?? "This is our Home"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <div>
            {message.map((msg, index) => (
              <div key={index}>
                <h4>{msg.sender}</h4>
                <p>{msg.content}</p>
              </div>
            ))}
            <form>
              <label>
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
            <button
              onClick={() => {
                sendJsonMessage({ type: "message", newMessage });
                setNewMessage("");
              }}
            >
              Send Message
            </button>
          </div>
        </>
      )}
    </>
  );
};
