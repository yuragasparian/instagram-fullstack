import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Posts from "./../components/posts/index";
import { Post } from "@/types/posts";
import SuggestedPeople from './../components/suggestedPeople/index';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect( () => {
    axios
      .get("http://localhost:3030/posts", { withCredentials: true })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    posts &&
    <div className="flex gap-10">
      <Posts posts={posts} />
      <SuggestedPeople />
    </div>
  );
};

export default Home;
