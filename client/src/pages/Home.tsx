import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Posts from "./../components/posts/index";
import { Post } from "@/types/posts";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
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
  return <>{posts && Posts(posts)}
  <div>Suggested for you</div></>;
};

export default Home;
