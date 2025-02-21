import { FC, ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}

const SideBar: FC<SideBarProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SideBar;
