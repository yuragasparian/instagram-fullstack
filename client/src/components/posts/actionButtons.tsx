import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { Button } from "../ui/button";

const ActionButtons = () => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-1">
        <Button variant={"ghost"} size={"icon"}>
          <Heart className="size-6" />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <MessageCircle className="size-6" />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Send className="size-6" />
        </Button>
      </div>
      <Button variant={"ghost"} size={"icon"}>
        <Bookmark className="size-6" />
      </Button>
    </div>
  );
};

export default ActionButtons;
