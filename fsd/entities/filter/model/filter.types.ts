export type Filter = {
  filter_id: number
  filter_name: string
  filter_data: FilterData
  original_values: string[]
  filter_group_id: number
  multi: boolean
  isactive: boolean
}

type FilterData = {
  db_name: string
  column_name: string
}

export type GetChartsFilterData = {
  filter_id: number
  filter_values: string[]
}

export type FilterState = {
  filters:GetChartsFilterData[]
  setFilters:(filters:GetChartsFilterData[]) => void
}