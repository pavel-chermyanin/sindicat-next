
type GetPivotCellStylesProps ={
  value:number,min:number,max:number
}

export const getPivotCellStyles = ({value,min,max}:GetPivotCellStylesProps) => {
  if (value == null) return {}; // если значение отсутствует, не применяем стиль

  const ratio = (value - min) / (max - min); // Простая нормализация

  // От темного (красного) к светлому (белому) в зависимости от значения
  const darkColor = [250, 134, 130]; // #f7635c
  const lightColor = [255, 248, 248]; // #fff2f2

  const interpolatedColor = lightColor.map((c, i) => Math.round(c + (darkColor[i] - c) * ratio));

  return {
    fontSize: 20,
    backgroundColor: `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`,
    color: ratio < 0.5 ? 'black' : 'white',
  };
}