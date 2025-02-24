import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axios, { AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { Post } from "@/types/posts";
import { useStore } from "@/store/store";

const CreatePost = () => {
  const { register, handleSubmit } = useForm<Post>();
  const {userInfo} = useStore()

  const addPost = (d: Post) => {
    axios.post(
      "http://localhost:3030/add-post",
      {
        image_url: d.image_url,
        caption: d.caption,
        author_username: userInfo?.username,
      },
      { withCredentials: true }
    ).then((t:AxiosResponse) => alert("Post has been created \n"+ JSON.stringify(t.data))
    )
  };
  return (
    <form
      className="flex flex-col items-center gap-4"
      onSubmit={handleSubmit(addPost)}
    >
      <h1 className="text-xl font-bold">Create new post</h1>
      <Input
        {...register("image_url")}
        placeholder="Enter image url..."
      ></Input>
      <Input
        {...register("caption")}
        placeholder="Enter description..."
      ></Input>
      <Button type="submit" className="w-full font-bold">
        Post
      </Button>
    </form>
  );
};

export default CreatePost;

