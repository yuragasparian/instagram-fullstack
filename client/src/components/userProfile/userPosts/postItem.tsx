// import PostModal from "@/components/posts/postModal";
import { Post } from "@/types/posts";
import { useState } from "react";
import axios from "axios";
import { PostContext } from "@/components/posts/postBlock";
import CommentsSection from "@/components/posts/postModal/commentsSection";
import PostImages from "@/components/posts/postModal/postImages";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const PostItem = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(Boolean);
  const [openModal, setOpenModal] = useState<Post | null>(null);
  const handleSelectPost = () => {
    axios
      .get(`http://localhost:3030/posts?postId=${post.id}`, {
        withCredentials: true,
      })
      .then((post) => {
        setOpenModal(post.data);
      })
      .catch((err) => console.log(err));
  };

  return openModal ? (
    <PostContext.Provider value={{ liked, setLiked, post: openModal }}>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="aspect-square bg-cover cursor-pointer"
            style={{ backgroundImage: `url(${post.image_url})` }}
          ></div>
        </DialogTrigger>
        <DialogContent
          className="flex overflow-hidden m-auto p-0 h-[90%] w-[80%]"
          aria-describedby=""
        >
          <DialogTitle className="hidden" />
          <PostImages image={post.image_url} />
          <CommentsSection />
        </DialogContent>
      </Dialog>
    </PostContext.Provider>
  ) : (
    <div
      onMouseEnter={handleSelectPost}
      className="aspect-square bg-cover cursor-pointer"
      style={{ backgroundImage: `url(${post.image_url})` }}
    ></div>
  );
};

export default PostItem;
