import { cn } from "@/lib/utils";
import { FC } from "react";

const ChatBubble: FC<{
  sentByMe: Boolean;
  message: string;
  senderImage: string;
}> = ({ sentByMe, message, senderImage }) => {
  return (
    <div className="flex gap-3 font-medium text-nowrap  ">
      {!sentByMe && <img src={senderImage} alt="" className="size-7 rounded-full inline"/> }
      <span
        className={cn(
          sentByMe ? "bg-primary text-white ml-auto" : "bg-gray-200",
          "rounded-2xl px-4 py-1 w-min"
        )}
      >
        {message}
      </span>
    </div>
  );
};

export default ChatBubble;
