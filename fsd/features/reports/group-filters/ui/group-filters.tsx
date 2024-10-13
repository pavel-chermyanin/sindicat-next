'use client'

import {
  Filter,
  GetChartsFilterData,
  useFilterActions,
  useGetDependentFilterMutation,
  useGetFiltersQueries
} from "@/fsd/entities/filter";
import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";
import {FormProvider, useForm, useFieldArray} from "react-hook-form";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {CustomText} from "@/fsd/shared/ui/CustomText";
import {CustomCheckPicker} from "@/fsd/shared/ui/checkPicker/CheckPicker";
import styles from './group-filters.module.scss'
import {FilterItem} from "@/fsd/features/reports/group-filters/ui/filter-item/filter-item";
import {fi} from "date-fns/locale";

export type FilterWithSelectedValue = Filter & {
  selected_value: string[];
}

export type FormState = {
  filters: FilterWithSelectedValue[];
  activeFilterIndex: number | null
}


export const GroupFilters = () => {
  const searchParams = useSearchParams()
  const {
    setFilters,

  } = useFilterActions()

  const {
    mutate: dependentFilterMutate,
    data: dependentFilters,
    error,
    isPending,
    isSuccess: isSuccessDepedentFilters
  } = useGetDependentFilterMutation()
  // console.log(dependentFilters)
  const {data: filters, isSuccess, isFetching} = useGetFiltersQueries(+searchParams.get('group_id')!)

  const methods = useForm<FormState>();
  const {control} = methods;
  // console.log(isPending, isSuccessDepedentFilters)

  // Типизация useFieldArray
  const {fields} = useFieldArray<FormState, 'filters', 'id'>({
    control,
    name: "filters", // Доступ к массиву фильтров в хранилище формы
    keyName: "id" // Имя ключа для уникального идентификатора поля
  });

  useEffect(() => {
    if (isSuccessDepedentFilters) {
      const activeFilterIndex = methods.getValues('activeFilterIndex')
      const filters = methods.getValues('filters')
      const newFilters = filters.slice(0, activeFilterIndex! + 1).concat(dependentFilters);
      // console.log(methods.getValues('filters'))
      // Выполняем частичный сброс, обновляя только поле `filters`
      methods.reset({
        filters: newFilters.map(filter => {

          return {
            ...filter,
            selected_value: filter.isactive
              ? (filter.selected_value?.length ? filter.selected_value : (filter.original_values?.[0] ? [filter.original_values[0]] : []))
              : []
          }
        }),
      }, {});


      const resetFilters = methods.getValues('filters')

      const filter_data = resetFilters
        .map(filter => {
          console.log(filter)
          return {
            filter_id: filter.filter_id,
            filter_values: filter.isactive ? filter.selected_value : [],
          }
        })

      setFilters(filter_data)

    }

  }, [isSuccessDepedentFilters, dependentFilters]);


  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        filters: (filters as FilterWithSelectedValue[]).map(filter => {
          return {
            ...filter,
            selected_value: filter.isactive ? [filter.original_values[0]] : []
          }
        }),
      },);
    }

    if (!filters?.length) {
      methods.reset({
        filters: [],
      });
    }

  }, [isSuccess, filters]);


  const handleFilter = async (data: FormState) => {
    // console.log(data)

    const activeIndex = data.activeFilterIndex!
    const filterLeft = data.filters.reduce((acc, item, index) => {
      if (activeIndex >= index) {
        acc.push({filter_id: item.filter_id, filter_values: item.selected_value})
      }
      return acc
    }, [] as GetChartsFilterData[])

    const recalculateIds = data.filters
      .slice(activeIndex + 1)
      .map(filter => filter.filter_id)

    if (recalculateIds.length) {
      dependentFilterMutate({
        data: {
          filter_data: filterLeft,
          to_recalculate: recalculateIds
        },
        group_id: +searchParams.get('group_id')!
      })
    }


    if (!recalculateIds.length) {
      const filter_data = data.filters
        .filter(filter => Array.isArray(filter.selected_value) && filter.selected_value.length > 0)
        .map(filter => {
          return {
            filter_id: filter.filter_id,
            filter_values: filter.selected_value ? filter.selected_value : [],
          }
        })

      setFilters(filter_data)
    }

  }

  return (
    <FormProvider {...methods}>
      <div className={`${styles.wrapper}`}>
        {fields.map((field, idx) => {
          return (
            <FilterItem key={idx} idx={idx} field={field} handleFilter={handleFilter}/>
          );
        })}
      </div>
    </FormProvider>
  );
};
