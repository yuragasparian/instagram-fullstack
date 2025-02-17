import { Button } from '@/components/ui/button';
import { User } from './../../../../types/posts';

const CommentsHeader = ({author}:{author:User}) => {
  return (
    <div className="flex items-center gap-4">
            <img
              src={author.profile_picture}
              className="rounded-full size-9"
            />
            <span className="font-semibold">{author.username}</span>
            <Button variant={"link"} className="p-0 text-base">
              Follow
            </Button>
          </div>
  )
}

export default CommentsHeader