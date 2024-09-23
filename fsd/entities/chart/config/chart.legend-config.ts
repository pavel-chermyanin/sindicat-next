import {EChartsOption} from "echarts";


export const legendConfig:EChartsOption = {
  legend: {
    show: true,
    bottom: 0,
    selectedMode: false,
    type: 'scroll',
    width: '90%',  // Ограничиваем ширину легенды
    orient: 'horizontal',  // Горизонтальная ориентация
    align: 'left',  // Легенда выравнивается по левому краю
    itemGap: 10,  // Расстояние между элементами
    // lineHeight: 20,  // Высота строки
  },
}