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
  onChangeOutside?: (value: string | string[]) => void;
  value?: string[];
  disabled?:boolean
}

export const CustomSelect: React.FC<CustomSelectProps> = (
  {
    name,
    data,
    placeholder,
    className,
    loading = false,
    onChangeOutside,
    value,
    disabled = false
  }
) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <SelectPicker
          disabled={disabled}
          loading={loading}
          {...field}
          value={Array.isArray(value) ? value[0] : field.value}
          data={data}
          placeholder={placeholder}
          className={cl(styles.select, className)}
          onChange={(selectedValue) => {
            const updatedValue = selectedValue ? [selectedValue] : [];
            field.onChange(updatedValue); // Обновляем значение в react-hook-form
            if (onChangeOutside) {
              onChangeOutside(updatedValue); // Вызываем onChangeOutside
            }
          }}
        />
      )}
    />
  );
};