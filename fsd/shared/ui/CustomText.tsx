import {Text} from "rsuite";

type CustomTextProps = {
  children: React.ReactNode;
  muted?: boolean
}

export const CustomText = (
  {
    children,
    muted = false
  }: CustomTextProps) => {
  return (
    <Text
      muted={muted}
    >
      {children}
    </Text>
  )
}