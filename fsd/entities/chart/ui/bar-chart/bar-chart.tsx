'use client'

import {BarChartType, ChartType} from "@/fsd/entities/chart";
import React, {useEffect, useRef, useState} from "react";
import ReactECharts from 'echarts-for-react';
import {EChartsOption} from "echarts";
import {useSearchParams} from "next/navigation";
import {useResize} from "../../utils/use-resize";
import {legendConfig} from "@/fsd/entities/chart/config/chart.legend-config";

export const BarChart = ({chart}: { chart: ChartType }) => {
  const searchParams = useSearchParams();
  const echartRef = useRef<any>(null); // Реф для компонента ReactECharts
  const barChart = chart.chart as BarChartType;

  const getOption = (): EChartsOption => ({
    series: Object.keys(barChart.seriesData).map((seriesName) => {
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

  // Функция для динамического обновления графика
  const updateChart = () => {
    if (echartRef.current) {
      // console.log(echartRef.current.getEchartsInstance());
      echartRef.current.getEchartsInstance().resize(); // Перерасчет размеров графика
    }
  };

  // Вызов обновления размеров при изменении размеров экрана
  useResize(updateChart);

  useEffect(() => {
    updateChart(); // Обновляем график при изменении параметров или данных
  }, [searchParams.get('report_id')]);

  return (
    <div style={{width: '100%', height: '600px'}}>
      <ReactECharts
        ref={echartRef}
        option={getOption()}
        style={{height: '100%', width: '100%'}}
        notMerge={true}
        lazyUpdate={true}
      />
    </div>
  );
};
