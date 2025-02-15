import { useContext } from "react";
import { PostContext } from "./postBlock";

type TPostInfo = {
  likes: number;
  username: string;
  caption: string;
};

const PostInfo = ({ likes, username, caption }: TPostInfo) => {
  const postContext = useContext(PostContext);

  const updatedLikes = postContext?.liked ? likes + 1 : likes;

  return (
    <div className="px-4">
      <p className="font-semibold">{updatedLikes} likes</p>
      <p>
        <span className="font-bold">{username} </span>
        {caption.split(" ").map((word, index) =>
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
