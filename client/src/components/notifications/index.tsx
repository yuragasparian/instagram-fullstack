import socket from "@/lib/socket";
import { useStore } from "@/store/store";
import { Notif } from "@/types/posts";
import { useEffect, useState } from "react";

const MyNotifications = () => {
    const {userInfo} = useStore()
  const [notifications, setNotifications] = useState<Notif[]>([]);

  useEffect(() => {
    if (userInfo?.id) {
      socket.emit("joinNotificationRoom", userInfo.id);
    }

    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [...prev, notif]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  return (
    <div>
      <h2>Notifications ({notifications.length})</h2>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyNotifications;
