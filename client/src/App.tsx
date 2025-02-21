import { Outlet } from "react-router";
import ValdateToken from "./lib/validateToken";
import MainMenu from "./components/mainMenu/index";
import { useStore } from "./store/store";
import  axios  from 'axios';


const App = () => {
  ValdateToken();

  const {userInfo, setSuggestedPeople} = useStore()

  if (!userInfo?.suggestedPeople || userInfo?.suggestedPeople.length == 0) {
    axios.get("http://localhost:3030/last-users").then((lastUsers) => {
      setSuggestedPeople(lastUsers.data);
    });
  }

  return (
    <div className="flex">
      <div className="w-3xs border-r h-dvh p-4 flex flex-col sticky top-0">
        <h1 className="text-3xl font-bold text-black my-5 ml-3">Instagram.</h1>
        <MainMenu />
      </div>
      <div className="p-16 w-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
