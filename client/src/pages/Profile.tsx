import UserProfileContextProvider from "@/components/userProfile/userProfileContext";
import UserProfile from "./../components/userProfile/index";

const Profile = () => {
  return (
    <UserProfileContextProvider>
      <div className="px-28">
        <UserProfile />
      </div>
    </UserProfileContextProvider>
  );
};

export default Profile;
