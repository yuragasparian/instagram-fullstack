import { useContext } from "react";
import { PostContext } from "./postBlock";

const PostInfo = () => {
  const postContext = useContext(PostContext);

  const updatedLikes = postContext?.liked ? postContext.post.likes + 1 : postContext?.post.likes;

  return (
    <div className="px-4">
      <p className="font-semibold">{updatedLikes} likes</p>
      <p>
        <span className="font-bold">{postContext?.post.author_username} </span>
        {postContext?.post.caption?.split(" ").map((word, index) =>
          word.startsWith("#") ? (
            <span key={index} className="text-blue-500">{word} </span>
          ) : (
            word + " "
          )
        )}
      </p>
    </div>
  );
};

export default PostInfo;
