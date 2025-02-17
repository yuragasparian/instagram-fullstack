import CommentsHeader from "./commentsHeader";
import { PostContext } from "./../../postBlock";
import { useContext, useState } from "react";
import CommentsBody from "./commentsBody";
import ActionButtons from "../../actionButtons";
import PostInfo from "../../postInfo";
import CommentInput from "./commentInput";
import { Comment } from "@/types/posts";

const CommentsSection = () => {
  const postContext = useContext(PostContext);
  if (!postContext) return null;
  const { post } = postContext;

  const [comments, setComments] = useState<Comment[]>(post.comments);

  return (
    <div className=" mx-6 p-5">
      <CommentsHeader user={post.user} />
      <hr className="my-3" />
      <CommentsBody comments={comments} />
      <hr className="my-3" />
      <ActionButtons commentActive={false} />
      <PostInfo />
      <hr className="my-3" />
      <CommentInput postId={post.id} setComments={setComments}/>
    </div>
  );
};

export default CommentsSection;
