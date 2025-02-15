import { Outlet } from "react-router";
import ValdateToken from "./lib/validateToken";
import MainMenu from "./components/mainMenu/index";

const App = () => {
  ValdateToken()

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
