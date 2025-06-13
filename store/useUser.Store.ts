import { create } from "zustand";

export type UserStore = {
  userDetail: any;
  setUserDetail: (userDetail: any) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userDetail: null,
  setUserDetail: (userDetail) => set({ userDetail }),
}));
