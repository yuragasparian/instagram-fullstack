import { useUserContext } from "../userProfileContext";
import PostItem from "./postItem";

const UserPosts = () => {
  const { user } = useUserContext();
  return (
    <div className="grid grid-cols-3 gap-1 mt-28">
      {user?.posts.map(
        (post) => 
        <PostItem key={post.id} post={post} />
      )}
    </div>
  );
};

export default UserPosts;
