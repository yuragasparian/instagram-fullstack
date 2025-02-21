import { Button } from '@/components/ui/button'
import { User } from '@/types/posts'
import { FC } from 'react'

const Receiverinfo:FC<{reciever:User}> = ({reciever}) => {
  return (
    <div className="flex flex-col items-center gap-4">
          <img
            src={reciever.profile_picture || "/user.jpg"}
            alt=""
            className="size-24 rounded-full"
          />
          <div className="text-center">
            <p className="text-xl font-semibold">{reciever.fullName}</p>
            <p className="text-accent-foreground">
              {reciever.username} {" | Instagram"}{" "}
            </p>
          </div>
          <Button className="font-semibold" variant={"secondary"}>
            View Profile
          </Button>
        </div>
  )
}

export default Receiverinfo