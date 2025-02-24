import { useUserContext } from "../userProfileContext"

const ProfilePicture = () => {
    const {user} = useUserContext()
  return (
    <img
        src={user?.profile_picture || "/user.jpg"}
        alt="Profile Image"
        className="w-40 h-40 rounded-full mx-12"
      />
  )
}

export default ProfilePicture