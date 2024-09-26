import {shallow} from "zustand/shallow";
import {useFilterStore} from "./filter.store";

export const useFilterActions = () => {
  const {
    filters,
    setFilters,

  } = useFilterStore(
    (state) => ({
      filters: state.filters,
      setFilters: state.setFilters,


    }),
    shallow // Использование shallow для поверхностного сравнения
  );

  return {
    filters,
    setFilters,

  };
};