import { User } from "@/types/posts"
import { FC } from "react"
import { Link } from "react-router"

const SuggestItem:FC<{profile:User}> = ({profile}) => {
  return (
    <Link to={"/"+profile.username} className="flex gap-4">
        <img src={profile.profile_picture || "/user.jpg"} alt=""  className="size-10 rounded-full"/>
        <span className="font-semibold">{profile.username}</span>
    </Link>
  )
}

export default SuggestItem