import {shallow} from "zustand/shallow";

import {useGroupStore} from "@/fsd/entities/group/model/group.store";

export const useGroupActions = () => {
  const {
    isEditableMode,
    setIsEditableMode,
    isOpenDrawerCreateChart,
    setIsOpenDrawerCreateChart ,
    isOpenDrawerFilters,
    setIsOpenDrawerFilters,
    isOpenDrawerCreateGroup,
    setIsOpenDrawerCreateGroup,
    isOpenDrawerEditGroup,
    setIsOpenDrawerEditGroup,
    isOpenDrawerCreatePresentation,
    setIsOpenDrawerCreatePresentation

  } = useGroupStore(
    (state) => ({
      isEditableMode: state.isEditableMode,
      setIsEditableMode: state.setIsEditableMode,

      isOpenDrawerCreateChart: state.isOpenDrawerCreateChart,
      setIsOpenDrawerCreateChart: state.setIsOpenDrawerCreateChart,

      isOpenDrawerFilters: state.isOpenDrawerFilters,
      setIsOpenDrawerFilters: state.setIsOpenDrawerFilters,

      isOpenDrawerCreateGroup: state.isOpenDrawerCreateGroup,
      setIsOpenDrawerCreateGroup: state.setIsOpenDrawerCreateGroup,

      isOpenDrawerEditGroup: state.isOpenDrawerEditGroup,
      setIsOpenDrawerEditGroup: state.setIsOpenDrawerEditGroup,

      isOpenDrawerCreatePresentation: state.isOpenDrawerCreatePresentation,
      setIsOpenDrawerCreatePresentation: state.setIsOpenDrawerCreatePresentation,


    }),
    shallow // Использование shallow для поверхностного сравнения
  );

  return {
    isEditableMode,
    setIsEditableMode,
    isOpenDrawerCreateChart,
    setIsOpenDrawerCreateChart,
    isOpenDrawerFilters,
    setIsOpenDrawerFilters,
    isOpenDrawerCreateGroup,
    setIsOpenDrawerCreateGroup,
    isOpenDrawerEditGroup,
    setIsOpenDrawerEditGroup,
    isOpenDrawerCreatePresentation,
    setIsOpenDrawerCreatePresentation
  };
};