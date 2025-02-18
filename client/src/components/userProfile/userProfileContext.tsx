import { User } from "@/types/posts";
import { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  user: User | null;
  updateUser: (newUser: User) => void;
}

const userContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(userContext);

  if (context === null) {
    throw new Error("useUserContext must be used within a UserProfileContextProvider");
  }

  return context;
};

interface UserProfileContextProviderProps {
  children: ReactNode;
}

const UserProfileContextProvider = ({ children }: UserProfileContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserProfileContextProvider;
