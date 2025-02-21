import { useEffect } from "react";
import axios from "axios";
import SuggestItem from "./suggestItem";
import { useStore } from "@/store/store";

const SuggestedPeople = () => {
  const { userInfo, setSuggestedPeople } = useStore();
  useEffect(() => {
    if (!userInfo?.suggestedPeople || userInfo?.suggestedPeople.length == 0) {
      axios.get("http://localhost:3030/last-users").then((lastUsers) => {
        setSuggestedPeople(lastUsers.data);
      });
    }
  }, []);
  return (
    userInfo?.suggestedPeople && (
      <div className="max-lg:hidden flex flex-col gap-4 w-4xl">
        <h3 className="font-semibold text-xl ">Suggested People</h3>
        {userInfo?.suggestedPeople.map((profile) => {
          return <SuggestItem key={profile.id} profile={profile} />;
        })}
      </div>
    )
  );
};

export default SuggestedPeople;
