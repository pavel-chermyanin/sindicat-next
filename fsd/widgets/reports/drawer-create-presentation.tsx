'use client'

import {Drawer} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";


export const DrawerCreatePresentation = () => {
  const {isOpenDrawerCreatePresentation, setIsOpenDrawerCreatePresentation} = useGroupActions()
  return (
    <Drawer
      open={isOpenDrawerCreatePresentation}
      onClose={() => setIsOpenDrawerCreatePresentation(false)}
    >
      <Drawer.Body>
        Create Presentation
      </Drawer.Body>
    </Drawer>
  )
}