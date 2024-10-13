import {Button} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";
import GridIcon from '@rsuite/icons/Grid';

export const ToggleEditableMode = () => {
  const {isEditableMode,setIsEditableMode} = useGroupActions()
  const handleChangeMode = () => {
    setIsEditableMode(!isEditableMode)
  }
  return (
    <Button className={'text-primary'} onClick={handleChangeMode}>
      <GridIcon/>
    </Button>
  )
}