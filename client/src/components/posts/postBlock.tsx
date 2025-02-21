import { Post } from "@/types/posts";
import { Card, CardContent } from "@/components/ui/card";
import ActionButtons from "./actionButtons";
import PostInfo from "./postInfo";
import { createContext, useState } from "react";
import { Link } from "react-router";

export const PostContext = createContext<null | {
  liked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post;
}>(null);

const PostBlock = ({ _post }: { _post: Post }) => {
  const [liked, setLiked] = useState(Boolean);

  return (
    <Card className="overflow-hidden mb-12 pb-8">
      <CardContent className="p-0">
        <PostContext.Provider value={{ liked, setLiked, post: _post }}>
          <Link
            className="flex items-center gap-4 p-4"
            to={`/${_post.author.username}`}
          >
            <img
              src={_post.author?.profile_picture}
              className="inline rounded-full"
              width="32px"
              height="32px"
            />
            <span className="font-bold">{_post.author_username}</span>
          </Link>
          <div>
            <img
              src={_post.image_url}
              alt=""
              className="aspect-square object-cover size-full"
            />
          </div>
          <ActionButtons commentActive />
          <PostInfo />
        </PostContext.Provider>
      </CardContent>
    </Card>
  );
};

export default PostBlock;
