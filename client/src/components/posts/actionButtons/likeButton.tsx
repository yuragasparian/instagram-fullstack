import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cn } from "@/lib/utils";
import { PostContext } from "../postBlock";
import { useStore } from "@/store/store";

const LikeButton = () => {
  const postContext = useContext(PostContext);
  const {userInfo, setLikedPosts} = useStore()

  if (!postContext || !userInfo) return null;

  const liked = postContext?.liked;
  const setLiked = postContext?.setLiked;

  useEffect(() => {
    const _liked = userInfo.liked.includes(postContext.post.id)
    if (_liked) {
      setLiked(true)
      
    }
  }, [])

  const handleLike = () => {
  setLiked((prev) => {
    const newLiked = !prev;
    setLikedPosts(postContext.post.id, newLiked)
    axios
      .post(
        "http://localhost:3030/likepost",
        { userId:userInfo.id, liked: newLiked, postId:postContext.post.id },
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
