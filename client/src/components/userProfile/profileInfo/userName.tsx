import { Button } from "@/components/ui/button";
import { useUserContext } from "../userProfileContext";
import { useState } from "react";
import axios from "axios";
import { useStore } from "@/store/store";
import { Link } from "react-router";
import sendNotification from "@/lib/sendNotification";

const UserName = () => {
  const { user, updateUser } = useUserContext();
  const { userInfo } = useStore();
  if (!user?.id || !userInfo?.id) return null;
  const [follow, setFollow] = useState(false);
  const handleFollow = () => {
    if (!follow) {
      axios
        .post(
          `http://localhost:3030/follow?to=${user.id}`,
          { userId: userInfo?.id },
          { withCredentials: true }
        )
        .then((res) => {
          setFollow(true);
          updateUser({...user, followers:[...user.followers, userInfo.id]})
          sendNotification({receiverId:user.id, senderId:userInfo.id, type:"follow", content:`${userInfo.username} started following you.`})
        });
    }
  };
  return (
    <div className="flex gap-4">
      <span className="font-semibold text-2xl">{user?.username}</span>
      <Button onClick={handleFollow} className="font-semibold">
        {follow ? "Unfollow" : "Follow"}
      </Button>
      <Link to={"/messages"}>
      <Button variant={"secondary"} className="font-semibold">
        Message
      </Button>
      </Link>
    </div>
  );
};

export default UserName;
