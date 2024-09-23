import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {UserState} from "./user.types";


// Создаем стор с использованием DevTools middleware
export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "user", store: "user" },
  ),
);