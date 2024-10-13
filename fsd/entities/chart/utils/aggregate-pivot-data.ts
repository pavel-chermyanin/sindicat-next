type AggregatePivotDataProps = {
  data: Record<string, string | number | null>[];
  rowKey: string;
  subRowKey: string;
  colKey: string;
  subColKey: string;
  aggregator: number; // Предполагаем, что aggregator - это строка (ключ)
};

// Функция для агрегации данных
export const aggregatePivotData = (
  {
    data,
    rowKey,
    subRowKey,
    colKey,
    subColKey,
    aggregator,
  }: AggregatePivotDataProps
) => {
  const result: Record<string, any> = {};
  let min: number | null = null; // Инициализация min как null
  let max: number | null = null; // Инициализация max как null

  data.forEach((item) => {
    const row = item[rowKey];
    const subRow = item[subRowKey];
    const col = item[colKey];
    const subCol = item[subColKey];
    const value = item[aggregator];

    // Проверяем, что row, subRow, col и subCol не равны null перед использованием
    if (row !== null && subRow !== null && col !== null && subCol !== null && value !== null) {
      // Проверяем, что строки не равны undefined
      if (!result[row]) result[row] = {};
      if (!result[row][subRow]) result[row][subRow] = {};
      if (!result[row][subRow][col]) result[row][subRow][col] = {};

      result[row][subRow][col] = result[row][subRow][col] || {};
      result[row][subRow][col][subCol] = value;

      // Проверяем тип value перед сравнением
      if (typeof value === 'number') {
        // Находим min и max значения
        if (min === null || value < min) min = value;
        if (max === null || value > max) max = value;
      } else if (typeof value === 'string') {
        // Преобразуем строку в число, если это возможно
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          if (min === null || numericValue < min) min = numericValue;
          if (max === null || numericValue > max) max = numericValue;
        }
      }
    }
  });

  return { result, min, max };
};
