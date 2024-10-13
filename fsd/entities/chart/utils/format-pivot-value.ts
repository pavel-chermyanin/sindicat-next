
type FormatPivotValue = {
  value: number;
  formatType: 'k' | 'm'
}
// Функция для форматирования значений
export const formatPivotValue = ({value, formatType}:FormatPivotValue) => {
  if (formatType === 'k') {
    return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
  } else if (formatType === 'm') {
    return value >= 1000000 ? `${(value / 1000000).toFixed(1)}m` : value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
  }
  return value;
};