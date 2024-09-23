import {Header as HeaderRsuite} from "rsuite";
import {Logo} from "@/fsd/shared/ui/logo/Logo";
import {Navbar} from "./nav";
import {LogoutBtn} from "@/fsd/features/logout-btn";
import {UserInfo} from "@/fsd/widgets/header/ui/user-info";

export const Header = () => {
  return (
    <HeaderRsuite className={'h-16 flex items-center gap-4'}>
      <Logo/>
      <Navbar/>
      <UserInfo className={'ml-auto'}/>
      <LogoutBtn />
    </HeaderRsuite>
  )
}