import socket from "@/lib/socket";
import { Message, User } from "@/types/posts";
import { FC, useEffect } from "react";
import ChatBubble from "./chatBubble";


const ChatsBody: FC<{
  receiver: User;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | undefined>>;
  messages: Message[] | undefined;
}> = ({ receiver, setMessages, messages }) => {
  useEffect(() => {
    socket.on("chatHistory", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (msg: Message) => {
      console.log("Received message:", msg);
      setMessages((prev=[]) => [...prev, msg]);
    });
  }, []);
  return (
    messages && (
      <div className="mt-8 flex flex-col gap-1">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            sentByMe={receiver.id != message.senderId}
            message={message.content}
            senderImage={receiver.profile_picture || "/user.jpg"}
          />
        ))}
      </div>
    )
  );
};

export default ChatsBody;
