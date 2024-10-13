'use client'

import {Drawer} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";


export const DrawerCreateGroup = () => {
  const {isOpenDrawerCreateGroup, setIsOpenDrawerCreateGroup} = useGroupActions()
  return (
    <Drawer
      open={isOpenDrawerCreateGroup}
      onClose={() => setIsOpenDrawerCreateGroup(false)}
    >
      <Drawer.Body>
        Create group
      </Drawer.Body>
    </Drawer>
  )
}