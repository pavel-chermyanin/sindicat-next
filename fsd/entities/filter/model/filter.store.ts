import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {FilterState} from "./filter.types";


// Создаем стор с использованием DevTools middleware
export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      filters: [],
      setFilters: (filters) => set({ filters }),

    }),
    { name: "filters", store: "filters" },
  ),
);