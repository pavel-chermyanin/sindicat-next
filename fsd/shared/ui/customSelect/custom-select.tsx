import cl from "classnames";
import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {SelectPicker} from "rsuite";

import styles from "./custom-select.module.scss";

interface CustomSelectProps {
  name: string;
  data: { label: string; value: string | number }[];
  placeholder?: string;
  className?: string;
  loading?: boolean
  onChangeOutside?: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = (
  {
    name,
    data,
    placeholder,
    className,
    loading = false,
    onChangeOutside
  }
) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <SelectPicker
          loading={loading}
          {...field}
          data={data}
          placeholder={placeholder}
          className={cl(styles.select, className)}
          onChange={(value) => {
            field.onChange(value); // Обновляем значение в react-hook-form
            if (onChangeOutside) {
              onChangeOutside(value); // Вызываем handleSubmit из GroupFilters
            }
          }}
        />
      )}
    />
  );
};