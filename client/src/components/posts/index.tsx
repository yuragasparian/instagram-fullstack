import { Post } from "@/types/posts"
import PostBlock from "./postBlock"

const Posts = ({posts}:{posts:Post[]}) => {  
  return (
    <div className="">
        {posts.map((post) =>(
            <PostBlock key={post.id} _post={post} />
        ))}
    </div>
  )
}

export default Posts