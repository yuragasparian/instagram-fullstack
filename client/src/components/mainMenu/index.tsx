import {
  ChartColumn,
  Clapperboard,
  Compass,
  Heart,
  HomeIcon,
  LucideProps,
  MessageCircleMore,
  Search,
  SquarePlus,
  UserRound,
} from "lucide-react";
import MainMenuItem from "./mainMenuItem";
import { useStore } from "@/store/store";

export type TMenuItem = {
  link: string;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};


const MainMenu = () => {
  const {username} = useStore()
  const menus: TMenuItem[] = [
    { link: "", name: "Home", icon: HomeIcon },
    { link: "search", name: "Search", icon: Search },
    { link: "explore", name: "Explore", icon: Compass },
    { link: "reels", name: "Reels", icon: Clapperboard },
    { link: "messages", name: "Messages", icon: MessageCircleMore },
    { link: "notifications", name: "Notifications", icon: Heart },
    { link: "create", name: "Create", icon: SquarePlus },
    { link: "dashboard", name: "Dashboard", icon: ChartColumn },
    { link: username, name: "Profile", icon: UserRound },
  ];
  return (
    <div className="flex flex-col gap-2 mt-4">
      {menus.map((menu: TMenuItem) => MainMenuItem(menu))}
    </div>
  );
};

export default MainMenu;
