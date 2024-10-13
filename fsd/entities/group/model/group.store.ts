import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {GroupState} from "./group.types";


// Создаем стор с использованием DevTools middleware
export const useGroupStore = create<GroupState>()(
  devtools(
    (set) => ({
      isEditableMode: false,
      setIsEditableMode: (bool) => set({ isEditableMode:bool }),

      isOpenDrawerCreateChart: false,
      setIsOpenDrawerCreateChart: (bool) => set({ isOpenDrawerCreateChart:bool }),

      isOpenDrawerFilters: false,
      setIsOpenDrawerFilters: (bool) => set({ isOpenDrawerFilters:bool }),

      isOpenDrawerCreateGroup: false,
      setIsOpenDrawerCreateGroup: (bool) => set({ isOpenDrawerCreateGroup:bool }),

      isOpenDrawerEditGroup: false,
      setIsOpenDrawerEditGroup: (bool) => set({ isOpenDrawerEditGroup:bool }),

      isOpenDrawerCreatePresentation: false,
      setIsOpenDrawerCreatePresentation: (bool) => set({ isOpenDrawerCreatePresentation:bool }),

    }),
    { name: "group", store: "group" },
  ),
);