'use client'

import {Button} from "rsuite";
import ExitIcon from '@rsuite/icons/Exit';
import {useUserActions} from "@/fsd/entities/user";
import {ACCESS_TOKEN} from "@/fsd/core/global.constants";
import {useRouter} from "next/navigation";


export const LogoutBtn = ({className}: { className?: string }) => {
  const {setUser} = useUserActions()
  const {push} = useRouter()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem(ACCESS_TOKEN)
    push('/auth')
  }
  return (
    <Button
      onClick={handleLogout}
      className={className}
      endIcon={<ExitIcon/>}
    >
      Выйти из системы
    </Button>
  )
}