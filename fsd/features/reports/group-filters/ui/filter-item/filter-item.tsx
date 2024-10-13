import {CustomText} from "@/fsd/shared/ui/CustomText";
import {CustomCheckPicker} from "@/fsd/shared/ui/checkPicker/CheckPicker";
import {SubmitHandler, useFormContext} from "react-hook-form";
import {FilterWithSelectedValue, FormState} from "../group-filters";
import {useEffect, useState} from "react";
import {CustomSelect} from "@/fsd/shared/ui/customSelect/custom-select";

type FilterItemProps = {
  idx: number
  field: FilterWithSelectedValue,
  handleFilter: SubmitHandler<FormState>;  // Указываем типизатор для формы
}

export const FilterItem = ({idx, field, handleFilter}: FilterItemProps) => {
  const methods = useFormContext<FormState>();
  const [dataState, setDataState] = useState(field.original_values.map(filter => {
    return {
      label: filter,
      value: filter
    }
  }))

  useEffect(() => {
    // console.log(1111)
    //
    // if (activeFilter === i) return
    setDataState(field.original_values.map((item) => ({
      label: item,
      value: item,
    })))

  }, [field.original_values]);

  // console.log(field)
  return (
    <div key={idx}>
      <CustomText>{field.filter_name}</CustomText>
      {field.multi
        ? (
          <CustomCheckPicker
            // disabledItemValues={isPending ? methods.getValues(`filters.${idx}.original_values`) : []}
            disabled={!field.isactive}
            name={`filters.${idx}.selected_value`} // динамическое имя поля
            value={field.selected_value}
            data={dataState}
            // open={openSelect}
            onChangeOutside={() => {
              methods.setValue('activeFilterIndex', idx)
              methods.handleSubmit(handleFilter)()
            }}
          />
        )
        : (
          <CustomSelect
            disabled={!field.isactive}
            value={field.selected_value}
            data={dataState}
            name={`filters.${idx}.selected_value`} // динамическое имя поля
            onChangeOutside={() => {
              methods.setValue('activeFilterIndex', idx)
              methods.handleSubmit(handleFilter)()
            }}
          />
        )
      }

    </div>
  );
}