import { Post } from "@/types/posts";
import { Card, CardContent } from "@/components/ui/card";
import ActionButtons from "./actionButtons";
import PostInfo from "./postInfo";
import { createContext, useState } from "react";

export const PostContext = createContext<null | {
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  post:Post
}>(null);

const PostBlock = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="overflow-hidden mb-12 pb-8">
      <CardContent className="p-0">
        <PostContext.Provider value={{ liked, setLiked, post }}>
          <div className="flex items-center gap-4 p-4">
            <img
              src={post.author?.profile_picture}
              className="inline rounded-full"
              width="32px"
              height="32px"
            />
            <span className="font-bold">{post.author_username}</span>
          </div>
          <div>
            <img
              src={post.image_url}
              alt=""
              className="aspect-square object-cover size-full"
            />
          </div>
          <ActionButtons commentActive/>
          <PostInfo/>
        </PostContext.Provider>
      </CardContent>
    </Card>
  );
};

export default PostBlock;
