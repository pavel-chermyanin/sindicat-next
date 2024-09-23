'use client'

import {Filter, useFilterActions} from "@/fsd/entities/filter";
import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";
import {FormProvider, useForm, useFieldArray} from "react-hook-form";
import {getChartsData} from "@/fsd/entities/chart";
import {HomeSearchParams} from "@/fsd/shared/types/HomeSearchParams";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {CustomText} from "@/fsd/shared/ui/CustomText";

type FilterWithSelectedValue = Filter & {
  selected_value: string;
}

type FormState = {
  filters: FilterWithSelectedValue[];
}

export const GroupFilters = ({filters}: { filters: Filter[] }) => {
  const methods = useForm<FormState>();
  const {setFilters} = useFilterActions()
  const {control} = methods;


  // Типизация useFieldArray
  const {fields} = useFieldArray<FormState, 'filters', 'id'>({
    control,
    name: "filters", // Доступ к массиву фильтров в хранилище формы
    keyName: "id" // Имя ключа для уникального идентификатора поля
  });

  useEffect(() => {
    if (filters.length) {
      methods.reset({
        filters: filters,
      });
    }

  }, [filters]);


  const handleFilter = async (data: FormState) => {

    const filter_data = data.filters
      .map(filter => {
        return {
          filter_id: filter.filter_id,
          filter_values: filter.selected_value ? [filter.selected_value.toString()] : [],
        }
      })
      .filter(filter => Array.isArray(filter.filter_values) && filter.filter_values.length > 0)

    setFilters(filter_data)


  }


  return (
    <FormProvider {...methods}>
      <div className={'mt-4 flex gap-2'}>
        {fields.map((field, idx) => {
          const data = field.original_values.map((item: string) => {
            return {value: item.toString(), label: item};
          });
          return (
            <div className={`w-56`}>
              <CustomText>{field.filter_name}</CustomText>
              <CustomSelect
                key={field.id} // уникальный ключ для каждого элемента
                name={`filters.${idx}.selected_value`} // динамическое имя поля
                data={data}
                onChangeOutside={() => methods.handleSubmit(handleFilter)()}
              />
            </div>
          );
        })}
      </div>
    </FormProvider>
  );
};
