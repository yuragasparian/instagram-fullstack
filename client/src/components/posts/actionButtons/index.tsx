import { Button } from "@/components/ui/button";
import { Bookmark, Send } from "lucide-react";
import LikeButton from './likeButton';
import PostModal from './../postModal/index';


const ActionButtons = ({commentActive}:{commentActive:boolean}) => {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-1">
        <LikeButton/>
        {commentActive && <PostModal />}
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
