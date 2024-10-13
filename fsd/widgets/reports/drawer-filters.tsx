'use client'

import {Drawer} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";


export const DrawerFilters = () => {
  const {isOpenDrawerFilters, setIsOpenDrawerFilters} = useGroupActions()
  return (
    <Drawer
      open={isOpenDrawerFilters}
      onClose={() => setIsOpenDrawerFilters(false)}
    >
      <Drawer.Body>
        FIlters
      </Drawer.Body>
    </Drawer>
  )
}