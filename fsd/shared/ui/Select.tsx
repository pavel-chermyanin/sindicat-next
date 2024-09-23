import {SelectPicker} from "rsuite";


export const Select = ({data}) => {
  const dataClients = clients
    .map(client => ({label: client.client_name, value: client.client_id}))
  return (
    <SelectPicker data={data}/>
  )
}