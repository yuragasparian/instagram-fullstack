import { Button } from '@/components/ui/button';
import { User } from './../../../../types/posts';

const CommentsHeader = ({user}:{user:User}) => {
  return (
    <div className="flex items-center gap-4">
            <img
              src={user.profile_picture}
              className="rounded-b-full size-9"
            />
            <span className="font-semibold">{user.username}</span>
            <Button variant={"link"} className="p-0 text-base">
              Follow
            </Button>
          </div>
  )
}

export default CommentsHeader