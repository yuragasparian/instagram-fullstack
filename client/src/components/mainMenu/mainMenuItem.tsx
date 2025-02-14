import { TMenuItem } from ".";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

const MainMenuItem = (menu: TMenuItem) => {
  return (
    <Button key={menu.link} asChild variant={"ghost"} size={"icon"} className="w-full justify-start px-4 gap-3 h-12">
        
      <NavLink 
        to={`/${menu.link}`}
        // className={({ isActive }) => ` ${isActive ? "navlink_active:" : ""}`}
      >
        {<menu.icon className="!w-7 !h-7"/>}
        <span className="text-base"> {menu.name}</span>
      </NavLink>
    </Button>
  );
};

export default MainMenuItem;
