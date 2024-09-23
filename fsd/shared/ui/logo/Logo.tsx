import Image from "next/image";
import logo from "./roomir-logo.png";

export const Logo = () => {
  return (
    <Image src={logo} alt={'Логотип'} width={100} height={30}/>
  )
}