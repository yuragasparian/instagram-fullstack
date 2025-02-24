import { create } from "zustand";
import { User } from './../types/posts';



type TUserInfo = {
  userInfo: User | null;
  setUserInfo: (ui: User) => void;
  setLikedPosts: (postId: string, liked: boolean) => void
  setSuggestedPeople: (users: User[]) => void
};

export const useStore = create<TUserInfo>((set) => ({
  userInfo: null,

  setUserInfo: (ui) => set(() => ({ userInfo: ui })),

  setLikedPosts: (postId, liked) =>
    set((state) => ({
      userInfo: state.userInfo
        ? {
          ...state.userInfo,
          liked: liked
            ? [...state.userInfo.liked, postId]
            : state.userInfo.liked.filter((id) => id !== postId),
        }
        : null,
    })),

  setSuggestedPeople: (users) => set((state) => ({
  userInfo: {
    ...state.userInfo, // existing user info
    suggestedPeople: users, // update the suggestedPeople
  }
} as TUserInfo))



}));

