import {ButtonToolbar, Dropdown} from "rsuite";
import {useGroupActions} from "@/fsd/entities/group";


export const SettingsAdmin = () => {
  const {
    setIsOpenDrawerCreateChart,
    setIsOpenDrawerFilters,
    setIsOpenDrawerCreateGroup,
    setIsOpenDrawerEditGroup,
    setIsOpenDrawerCreatePresentation
  } = useGroupActions()
  return (
    <ButtonToolbar>
      <Dropdown
        placement="bottomEnd"
        title="Настройки"
        trigger={['click', 'hover']}
      >
        <Dropdown.Item
          onClick={() => setIsOpenDrawerCreateChart(true)}>
          Создать график
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setIsOpenDrawerFilters(true)}>
          Фильтры листа
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setIsOpenDrawerCreateGroup(true)}>
          Создать лист
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setIsOpenDrawerEditGroup(true)}>
          Редактировать лист
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => setIsOpenDrawerCreatePresentation(true)}>
          создать презентацию
        </Dropdown.Item>
      </Dropdown>
    </ButtonToolbar>
  )
}