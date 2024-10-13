import { useMemo } from "react";



// Получаем уникальные значения строк или колонок
export const useUniqueLabels = (data: Record<string, any>[], key: string) => {
  return useMemo(() => [...new Set(data.map((item) => item[key]))], [data, key]);
};
// Получаем подколонки, сгруппированные по колонкам
export const useSubColLabels = (data: Record<string, any>[], mainKey: string, subKey: string) => {
  return useMemo(() => {
    return data.reduce((acc, item) => {
      const mainValue = item[mainKey];  // Значение колонки
      const subValue = item[subKey];    // Значение подколонки

      if (!acc[mainValue]) acc[mainValue] = [];
      if (subValue !== null && !acc[mainValue].includes(subValue)) {
        acc[mainValue].push(subValue);
      }

      return acc;
    }, {} as Record<string, string[]>);  // Возвращаем объект, где колонки — ключи, а подколонки — значения
  }, [data, mainKey, subKey]);
};

// Получаем подстроки, сгруппированные по строкам
export const useSubLabels = (data: Record<string, any>[], mainKey: string, subKey: string) => {
  return useMemo(() => {
    return data.reduce((acc, item) => {
      const mainValue = item[mainKey];  // Значение строки
      const subValue = item[subKey];    // Значение подстроки

      if (!acc[mainValue]) acc[mainValue] = [];
      if (subValue !== null && !acc[mainValue].includes(subValue)) {
        acc[mainValue].push(subValue);
      }

      return acc;
    }, {} as Record<string, string[]>);  // Возвращаем объект, где строки являются ключами, а подстроки — значениями
  }, [data, mainKey, subKey]);
};