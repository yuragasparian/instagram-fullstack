import { useContext } from "react";
import { PostContext } from "./postBlock";
import { Link } from "react-router";

const PostInfo = () => {
  const postContext = useContext(PostContext);
  if(!postContext?.post) return null

  const updatedLikes = postContext?.liked ? postContext.post.likes + 1 : postContext?.post.likes;

  return (
    <div className="px-4">
      <p className="font-semibold">{updatedLikes} likes</p>
      <p>
        <Link to={postContext?.post.author_username} className="font-bold">{postContext?.post.author_username} </Link>
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
