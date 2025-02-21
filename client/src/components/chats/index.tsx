import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SideBar from "./sideBar";
import { useStore } from "@/store/store";
import ChatSide from "./chatSide";

const Chats = () => {
  const { userInfo } = useStore();
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  return (
    userInfo?.suggestedPeople && (
      <Tabs
        defaultValue="account"
        onValueChange={(val) => {
          setCurrentChat(val);
        }}
        className="w-full flex-row h-full gap-9"
      >
        <SideBar>
          <TabsList className="w-80 h-full flex-col justify-start items-start">
            {userInfo?.suggestedPeople.map((user) => (
              <TabsTrigger
                key={user.id}
                value={user.username}
                className="w-full"
              >
                <div className="flex justify-start items-center gap-4 w-full">
                  <img
                    src={user.profile_picture || "/user.jpg"}
                    className="size-12 rounded-full"
                    alt=""
                  />
                  <p className="font-semibold">{user.username}</p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </SideBar>
        <div className="border-x  w-full">
          <ChatSide chatId={currentChat} />
        </div>
      </Tabs>
    )
  );
};

export default Chats;
