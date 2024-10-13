export type Group = {
  group_id: number
  group_name: string
  description: string
}

export type GroupState = {
  isEditableMode:boolean
  setIsEditableMode:(bool: boolean) => void

  isOpenDrawerCreateChart:boolean
  setIsOpenDrawerCreateChart:(bool: boolean) => void

  isOpenDrawerFilters:boolean
  setIsOpenDrawerFilters:(bool: boolean) => void

  isOpenDrawerCreateGroup:boolean
  setIsOpenDrawerCreateGroup:(bool: boolean) => void

  isOpenDrawerEditGroup:boolean
  setIsOpenDrawerEditGroup:(bool: boolean) => void

  isOpenDrawerCreatePresentation:boolean
  setIsOpenDrawerCreatePresentation:(bool: boolean) => void
}