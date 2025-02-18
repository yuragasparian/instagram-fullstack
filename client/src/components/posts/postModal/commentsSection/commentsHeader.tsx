import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { PostContext } from '../../postBlock';

const CommentsHeader = () => {
  const postContext = useContext(PostContext);
  if (!postContext) return null;
  const { post } = postContext;
  return (
    <div className="flex items-center gap-4">
            <img
              src={post.author.profile_picture}
              className="rounded-full size-9"
            />
            <span className="font-semibold">{post.author.username}</span>
            <Button variant={"link"} className="p-0 text-base">
              Follow
            </Button>
          </div>
  )
}

export default CommentsHeader