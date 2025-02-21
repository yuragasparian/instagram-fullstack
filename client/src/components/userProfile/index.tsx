import ProfileInfo from "./profileInfo";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "./userProfileContext";
import UserPosts from "./userPosts";

const UserProfile = () => {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const { updateUser } = useUserContext();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/user-profile?username=${username}&includePosts=true`)
      .then((user) => {
        updateUser(user.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [username]);
  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <ProfileInfo /> <UserPosts />
    </>
  );
};

export default UserProfile;
