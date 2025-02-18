import { useUserContext } from "../userProfileContext"

const UserDescription = () => {
    const {user} = useUserContext()
  return (
    <div className="flex justify-between">
        <p><span className="font-bold">{user?.posts.length}{" "}</span>Posts</p>
        <p><span className="font-bold">{user?.followers.length}{" "}</span>Followers</p>
        <p><span className="font-bold">{user?.follows.length}{" "}</span>Following</p>
      </div>
  )
}

export default UserDescription