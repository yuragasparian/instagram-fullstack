import { Post } from "@/types/posts"
import PostBlock from "./postBlock"

const Posts = (posts:Post[]) => {
  return (
    <div className="w-2/3">
        {posts.map((post) =>{
            return PostBlock(post)
        })}
    </div>
  )
}

export default Posts