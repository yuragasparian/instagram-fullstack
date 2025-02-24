import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import socket from "@/lib/socket";
import { Message } from "@/types/posts";
import { FC, useRef } from "react";

const InputMessage: FC<{
  senderId: string;
  receiverId: string;
}> = ({ senderId, receiverId }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!inputRef.current?.value.trim()) return;

    const newMessage: Omit<Message, "id" | "createdAt"> = {
      senderId,
      receiverId,
      content: inputRef.current.value,
    };

    socket.emit("sendMessage", newMessage);

    inputRef.current.value = "";
  };
  return (
    <div className="sticky left-0 right-0 pt-10 pb-2  bottom-0 bg-white">
      <Input ref={inputRef} placeholder="Message..."></Input>

      <Button
        variant="link"
        className="absolute top-10 right-0 inline"
        onClick={sendMessage}
      >
        Send
      </Button>
    </div>
  );
};

export default InputMessage;
