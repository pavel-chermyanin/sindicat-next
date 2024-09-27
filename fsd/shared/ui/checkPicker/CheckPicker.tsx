import React from "react";
import {Controller, useFormContext} from "react-hook-form";
import {CheckPicker} from "rsuite"; // Убедитесь, что CheckPicker импортируется правильно
import styles from "./checkPicker.module.scss";

// Определяем тип данных для CheckPicker
interface PickerData {
  label: string; // Текст для отображения
  value: string; // Значение, которое будет храниться
}

interface CustomCheckPickerProps {
  name: string;
  data: PickerData[]; // Типизированные данные для CheckPicker
  value?: string[];
  onChangeOutside?: (selectedValues: string[]) => void;
  lineColors?: string[];
  placeholder?: string;
  className?: string;
  searchable?: boolean;
  appearance?: "default" | "subtle";
  disabled?: boolean;
  renderMenuItem?: (label: React.ReactNode, item: PickerData) => React.ReactNode; // Изменено на React.ReactNode
  container?: HTMLElement | (() => HTMLElement);
  preventOverflow?: boolean;
  placement?: 'topEnd' | 'topStart' | 'bottomEnd' | 'bottomStart';
  disabledItemValues?: string[];
  defaultValue?: string[];
  open?:boolean
  onClick? :() => void
}

export const CustomCheckPicker: React.FC<CustomCheckPickerProps> = (
  {
    name,
    data,
    value,
    onChangeOutside,
    lineColors,
    placeholder = `Выберите элемент`,
    className,
    searchable = false,
    appearance = "default",
    disabled,
    renderMenuItem,
    container,
    preventOverflow = true,
    placement = 'bottomStart',
    disabledItemValues = [],
    defaultValue,
    open,
    onClick

  }
) => {
  const {control} = useFormContext();

  return (
    <div className={styles.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <CheckPicker
            style={{
              width: "100%",
            }}
            menuStyle={{
              width:200
            }}
            {...field}
            defaultValue={defaultValue}
            className={className}
            data={data} // Используем переданные данные напрямую
            value={value}
            disabled={disabled}
            onChange={(selectedValues: string[]) => {
              field.onChange(selectedValues);
              onChangeOutside && onChangeOutside(selectedValues);
            }}
            searchable={searchable}
            appearance={appearance}
            placeholder={placeholder}
            renderMenuItem={renderMenuItem as (label: React.ReactNode, item: any) => React.ReactNode} // Приведение типа
            disabledItemValues={disabledItemValues}
            container={container}
            placement={placement}
            preventOverflow={preventOverflow}
            open={open}
          />
        )}
      />
    </div>
  );
};
