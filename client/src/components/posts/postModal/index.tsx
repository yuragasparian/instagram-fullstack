import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { PostContext } from "../postBlock";
import PostImages from "./postImages";
import CommentsSection from "./commentsSection/index";

const PostModal = () => {
  const postContext = useContext(PostContext);
  if (!postContext) return null;
  const { post } = postContext;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MessageCircle className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex overflow-hidden m-auto p-0 h-[90%] w-[80%]" aria-describedby="">
        <DialogTitle className="hidden"/>
        <PostImages media={post.media} />
        <CommentsSection />
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
