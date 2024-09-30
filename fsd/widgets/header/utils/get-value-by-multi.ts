import {FilterWithSelectedValue} from "@/fsd/features/reports/group-filters/ui/group-filters";


export const getValueByMulti = ({filter}: {filter:FilterWithSelectedValue}) => {
  return filter.multi
    ? filter.selected_value || [filter.original_values[0]]
    : filter.selected_value[0] || filter.original_values[0]
}