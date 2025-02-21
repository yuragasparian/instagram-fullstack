import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { Message } from "@/types/posts";
import { ChangeEvent, FC, useState } from "react";

const InputMessage: FC<{
  senderId: string;
  receiverId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | undefined>>;
}> = ({ senderId, receiverId, setMessages }) => {
  const [input, setInput] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const sendMessage = () => {
    if (!input?.trim()) return;

    const newMessage:Omit<Message, 'id' | 'createdAt'> = {
      senderId,
      receiverId,
      content: input,
    };
    
    socket.emit("sendMessage", newMessage);

    setMessages((prev = []) => [
      ...prev,
      { 
        ...newMessage, 
        id: "temp-id", 
        createdAt: new Date()
      }
    ]);
    setInput("")
  };
  return (
    <div className="absolute bottom-0 left-0 right-0 px-10 ">
      <Input value={input || ""} placeholder="Message..." onChange={handleInput}></Input>
      {input && (
        <Button
          variant="link"
          className="absolute top-0 right-10 inline"
          onClick={sendMessage}
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default InputMessage;
