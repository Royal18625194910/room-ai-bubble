import { create, } from "zustand";
import { persist } from "zustand/middleware";
export type UserStore = {
  userDetail: any;
  setUserDetail: (userDetail: any) => void;
};

export const useUserStore = create(persist<UserStore>((set) => ({
  userDetail: {},
  setUserDetail: (userDetail) => set({ userDetail }),
}), {
  name: "user-store",
}))
