import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Comment } from '@/types/posts';
import { useStore } from "@/store/store";

const CommentInput = ({ postId, setComments }: { postId: string,  setComments:React.Dispatch<React.SetStateAction<Comment[]>> }) => {
  const [input, setInput] = useState<string | null>(null);

const {username} = useStore()
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addComment = async () => {
    if (!input?.trim()) return;

    axios.post(
      "http://localhost:3030/post-comment",
      {
        userComment: input,
        user_name: username,
        postId: postId,
      },
      { withCredentials: true }
    ).then((res:AxiosResponse<Comment>) => {
      setComments((prev) => [...prev, res.data])      
    });

    setInput("");
  };

  return (
    <div className="relative">
      <Input
        id="comment"
        type="text"
        placeholder="Add a comment ..."
        className="inline"
        value={input ? input : ""}
        onChange={handleInput}
      />
      {input && (
        <Button
          variant="link"
          className="absolute right-0 inline"
          onClick={addComment}
        >
          Post
        </Button>
      )}
    </div>
  );
};

export default CommentInput;
