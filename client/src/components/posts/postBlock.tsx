import { Post } from "@/types/posts";
import { Card, CardContent } from "@/components/ui/card";
import ActionButtons from "./actionButtons";
import PostInfo from './postInfo';

const PostBlock = (post: Post) => {
  return (
    <Card className="overflow-hidden mb-12 pb-8">
      <CardContent className="p-0 ">
        <div className="flex items-center gap-4 p-4">
          <img
            src={post.user.profile_picture}
            className="inline"
            width={"32px"}
            height={"32px"}
          />
          <span className="font-bold">{post.user.username}</span>
        </div>
        <div>
          <img
            src={post.media[0].url}
            alt=""
            className="aspect-square size-full"
          />
        </div>
        <ActionButtons />
        <PostInfo likes={post.likes} caption={post.caption} username={post.user.username}/>
      </CardContent>
    </Card>
  );
};

export default PostBlock;
