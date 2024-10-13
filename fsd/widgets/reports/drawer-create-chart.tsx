'use client'

import {Drawer} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";


export const DrawerCreateChart = () => {
  const {isOpenDrawerCreateChart, setIsOpenDrawerCreateChart} = useGroupActions()
  return (
    <Drawer
      open={isOpenDrawerCreateChart}
      onClose={() => setIsOpenDrawerCreateChart(false)}
    >
      <Drawer.Body>
        Create chart
      </Drawer.Body>
    </Drawer>
  )
}