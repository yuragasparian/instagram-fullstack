import { Button } from "@/components/ui/button";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import LikeButton from './likeButton';

const ActionButtons = ({postId}:{postId:string}) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-1">
        <LikeButton postId={postId}/>
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
