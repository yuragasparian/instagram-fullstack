import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Message, User } from "@/types/posts";
import socket from "@/lib/socket";
import { useStore } from "@/store/store";
import Receiverinfo from "./receiverinfo";
import InputMessage from "./inputMessage";
import ChatsBody from "./chatsBody";

const ChatRoom: FC<{ userId: string }> = ({ userId }) => {
  const { userInfo } = useStore();
  if (!userInfo) return <div>Undefined user</div>;
  const [reciever, setReciever] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>();

  useEffect(() => {
    const getUserMessages = async () => {
      console.log(1);

      try {
        const res = await axios.get(
          `http://localhost:3030/user-profile?username=${userId}`
        );
        setReciever(res.data);
        console.log("Receiver set:", res.data);

        if (res.data && userInfo?.id) {
          socket.emit("getMessages", {
            user1: userInfo.id,
            user2: res.data.id,
          });
          console.log("Socket emitted for:", userInfo.id, res.data.id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserMessages();
  }, [userId]);

  return (
    reciever && (
      <div className="relative h-full px-10 ">
        <Receiverinfo reciever={reciever} />
        <ChatsBody setMessages={setMessages} messages={messages} receiver={reciever}/>
        <InputMessage setMessages={setMessages} senderId={userInfo?.id} receiverId={reciever.id} />
      </div>
    )
  );
};

export default ChatRoom;
