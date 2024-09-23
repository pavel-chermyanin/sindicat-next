'use client'

import UserBadgeIcon from '@rsuite/icons/UserBadge';
import {useUserActions} from "@/fsd/entities/user";

export const UserInfo = ({className}: { className?: string }) => {
  const {user} = useUserActions()
  return (
    <div
      className={`${className} flex items-center gap-2`}
    >
      <UserBadgeIcon/>
      <p>{user?.username}</p>
    </div>
  )
}