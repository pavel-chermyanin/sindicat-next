
// Общий базовый тип форматирования

import { TypeChart } from "@/fsd/entities/chart/types/chart.types";

// Общий базовый тип для форматирования
export type BaseChartFormatting = {
  id: number;
  title: string;
  description: string;
  ispercent: boolean;
  formatting: BarChartFormatting | PivotChartFormatting; // Добавлено поле formatting
};

// Специфичные типы форматирования для различных диаграмм
export type BarChartFormatting = {
  type_chart: TypeChart;
  stack: 'total';
  isXAxis: boolean;
};

export type PivotChartFormatting = {
  type_chart: TypeChart;
  aggregator: number;
  rowKey: string;
  subRowKey: string;
  colKey: string;
  subColKey: string;
  format: 'k' | 'm';
};

export type ChartFormatting = BarChartFormatting | PivotChartFormatting