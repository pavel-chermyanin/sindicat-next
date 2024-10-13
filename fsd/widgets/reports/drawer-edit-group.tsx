'use client'

import {Drawer} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";


export const DrawerEditGroup = () => {
  const {isOpenDrawerEditGroup, setIsOpenDrawerEditGroup} = useGroupActions()
  return (
    <Drawer
      open={isOpenDrawerEditGroup}
      onClose={() => setIsOpenDrawerEditGroup(false)}
    >
      <Drawer.Body>
        Edit group
      </Drawer.Body>
    </Drawer>
  )
}