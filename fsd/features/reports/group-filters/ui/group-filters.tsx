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

type FilterWithSelectedValue = Filter & {
  selected_value: string[];
}

type FormState = {
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
    isSuccess: isSuccessDepedentFilters
  } = useGetDependentFilterMutation()
  console.log(dependentFilters)
  const {data: filters, isSuccess, isFetching} = useGetFiltersQueries(+searchParams.get('group_id')!)

  const methods = useForm<FormState>();
  const {control} = methods;


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
      console.log(methods.getValues('filters'))
      // Выполняем частичный сброс, обновляя только поле `filters`
      methods.reset({
        filters: newFilters.map(filter => {
          return {
            ...filter,
            selected_value: filter.selected_value || [filter.original_values[0]]
          }
        }),
      },);

      const resetFilters  = methods.getValues('filters')

      const filter_data = resetFilters
        .map(filter => {
          return {
            filter_id: filter.filter_id,
            filter_values: filter.selected_value,
          }
        })

      setFilters(filter_data)

    }

  }, [isSuccessDepedentFilters, dependentFilters]);

  // useEffect(() => {
  //   console.log('triger')
  //
  // }, [methods.trigger]);

  useEffect(() => {
    if (isSuccess) {
      methods.reset({
        filters: (filters as FilterWithSelectedValue[]).map(filter => {
          return {
            ...filter,
            selected_value:  [filter.original_values[0]]
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
    console.log(data)

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

    if(recalculateIds.length) {
      dependentFilterMutate({
        data: {
          filter_data: filterLeft,
          to_recalculate: recalculateIds
        },
        group_id: +searchParams.get('group_id')!
      })
    }



    if(!recalculateIds.length) {
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
          // const [openSelect, setOpenSelect] = useState(false)
          const data = field.original_values.map((item: string) => {
            return {value: item.toString(), label: item};
          });
          return (
            <div  key={idx}>
              <CustomText>{field.filter_name}</CustomText>
              <CustomCheckPicker
                // onClick={() => setOpenSelect(true)}
                key={field.id} // уникальный ключ для каждого элемента
                name={`filters.${idx}.selected_value`} // динамическое имя поля
                value={methods.getValues(`filters.${idx}.selected_value`)}
                data={data}
                // open={openSelect}
                onChangeOutside={() => {
                  methods.setValue('activeFilterIndex', idx)
                  methods.handleSubmit(handleFilter)()
                }}
              />
            </div>
          );
        })}
      </div>
    </FormProvider>
  );
};
