import { create } from "zustand";

type UserInfo = {
  username: string;
  setUsername: (un: string) => void;
};

export const useStore = create<UserInfo>((set) => ({
  username: "test",
  setUsername: (un: string) => set(() => ({ username: un })),
}));
