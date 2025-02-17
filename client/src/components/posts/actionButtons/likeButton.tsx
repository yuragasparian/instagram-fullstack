import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useContext } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cn } from "@/lib/utils";
import { PostContext } from "../postBlock";

const LikeButton = () => {
  const postContext = useContext(PostContext);

  if (!postContext) return null;

  const liked = postContext?.liked;
  const setLiked = postContext?.setLiked;

  const handleLike = () => {
  setLiked((prev) => {
    const newLiked = !prev;

    axios
      .post(
        "http://localhost:3030/likepost",
        { liked: newLiked, postId:postContext.post.id },
        { withCredentials: true }
      )
      .then((res: AxiosResponse) => {
        console.log(res.data);
      })
      .catch((err:AxiosError) => console.error(err));

    return newLiked;
  });
};


  return (
    <Button variant="ghost" size="icon" onClick={handleLike}>
      <Heart className={cn("size-6", liked ? "fill-red-500 stroke-0" : "")} />
    </Button>
  );
};

export default LikeButton;
