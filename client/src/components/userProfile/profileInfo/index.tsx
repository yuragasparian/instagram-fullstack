import ProfilePicture from './profilePicture';
import UserName from './userName';
import UserDescription from './userDescription';

const ProfileInfo = () => {
  return (
    <div className="flex gap-14 items-center">
      <ProfilePicture />
      <div className="flex flex-col gap-5">
      <UserName />
      <UserDescription />
      </div>
    </div>
  )
}

export default ProfileInfo