import { FC } from "react";
import SendMessage from "./sendMessage";
import ChatRoom from "./chatRoom";

const ChatSide: FC<{ chatId: string | null }> = ({ chatId }) => {
  return chatId ? <ChatRoom userId={chatId} /> : <SendMessage />;
};
export default ChatSide;
