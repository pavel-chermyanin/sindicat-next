'use client'

import {BarChartType, ChartType} from "@/fsd/entities/chart";
import React, {useEffect, useRef, useState} from "react";
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import {EChartsOption} from "echarts";
import {useSearchParams} from "next/navigation";
import {useResize} from "../../utils/use-resize";
import {legendConfig} from "@/fsd/entities/chart/config/chart.legend-config";

export const BarChart = ({chart}: { chart: ChartType }) => {
  const searchParams = useSearchParams();
  const chartRef = useRef<echarts.EChartsType | null>(null); // Создаем реф для хранения экземпляра графика
  const [chartKey, setChartKey] = useState(0); // Состояние для ключа компонента
  const barChart = chart.chart as BarChartType;


  const getOption = (): EChartsOption => ({
    series: Object.keys(barChart.seriesData).map((seriesName, index) => {
      return {
        name: seriesName,
        type: 'bar',
        data: barChart.seriesData[seriesName],
        stack: chart.formatting.stack ? 'total' : undefined,
      }
    }),
    ...legendConfig,
    xAxis: chart.formatting.isXAxis
      ? {
        type: 'category',
        data: barChart.xAxisData,
      }
      : {
        type: 'value'
      }
    ,
    yAxis: chart.formatting.isXAxis
      ? {
        type: 'value'
      }
      : {
        type: 'category',
        data: barChart.xAxisData,
      }
    ,
  });

  // Функция для уничтожения текущего инстанса графика
  // const disposeChart = () => {
  //   if (chartRef.current) {
  //     chartRef.current.dispose(); // Уничтожаем текущий инстанс
  //     chartRef.current = null;
  //   }
  // };

  // // Функция для динамического обновления графика при изменении данных
  // const updateChart = () => {
  //   disposeChart(); // Уничтожаем старый инстанс перед созданием нового
  //   setChartKey(prevKey => prevKey + 1); // Меняем ключ для пересоздания компонента
  // };
  //

  // Функция для динамического обновления графика
  const updateChart = () => {
    if (chartRef.current) {
      chartRef.current.resize(); // Перерасчет размеров графика
    }
  };

  // Вызов обновления размеров при изменении размеров экрана
  useResize(updateChart);


  useEffect(() => {
    updateChart(); // Обновляем график при изменении параметров или данных
    // setChartKey(prevKey => prevKey + 1); // Меняем ключ для пересоздания компонента
    // disposeChart()
  }, [ searchParams.get('report_id')]);

  return (
    <div style={{width: '100%', height: '600px'}} >
      <ReactECharts
        // key={chartKey} // Используем ключ для пересоздания компонента
        ref={(e) => {
          if (e) {
            chartRef.current = e.getEchartsInstance(); // Сохраняем новый экземпляр графика в реф
          }
        }}
        option={getOption()}
        style={{height: 600}}
      />
    </div>
  );
};
