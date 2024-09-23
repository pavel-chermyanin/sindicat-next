import {Header as HeaderRsuite} from "rsuite";
import {Logo} from "@/fsd/shared/ui/logo/Logo";
import {Navbar} from "./nav";

export const Header = () => {
  return (
    <HeaderRsuite className={'h-16 flex items-center gap-4'}>
      <Logo/>
      <Navbar/>
    </HeaderRsuite>
  )
}