import React, { useMemo } from "react";
import styles from './pivot-chart.module.scss';
import {ChartType, PivotChartType} from "@/fsd/entities/chart";
import {useSubColLabels, useSubLabels, useUniqueLabels} from "../../hooks/use-pivot-unique-labels";
import { aggregatePivotData } from "../../utils/aggregate-pivot-data";
import { getPivotCellStyles } from "../../utils/get-pivot-cell-styles";
import {formatPivotValue} from "../../utils/format-pivot-value";
import {PivotChartFormatting} from "../../types/chart-formatting.types";

export const PivotChart: React.FC<{ chart: ChartType }> = ({ chart }) => {
  const { rowKey, subRowKey, colKey, subColKey, aggregator, format = 'k' } = chart.formatting as PivotChartFormatting;

  // console.log(chart)
  const pivotData = (chart.chart as PivotChartType).table_data;
  const { result: aggregatedData, min, max } = useMemo(
    () => aggregatePivotData({
      data: pivotData,
      rowKey,
      subRowKey,
      colKey,
      subColKey,
      aggregator,
    }),
    [chart, rowKey, subRowKey, colKey, subColKey, aggregator, format]
  );

  const rowLabels = useUniqueLabels(pivotData, rowKey);
  const subRowLabels = useSubLabels(pivotData, rowKey, subRowKey);

  const colLabels = useUniqueLabels(pivotData, colKey);
  const subColLabels = useSubColLabels(pivotData, colKey, subColKey);


  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
        <tr>
          <th rowSpan={2}>{rowKey}</th>
          <th rowSpan={2}>{subRowKey}</th>
          {colLabels.map((col) => (
            <th key={col} colSpan={subColLabels[col]?.length}>
              {col}
            </th>
          ))}
        </tr>
        <tr>
          {colLabels.map((col) =>
            subColLabels[col]?.map((subCol: string) => (
              <th key={subCol}>{subCol}</th>
            ))
          )}
        </tr>
        </thead>
        <tbody>
        {rowLabels.map((row) => {
          const subRows = subRowLabels[row] || [];
          return subRows.map((subRow: string, index: number) => (
            <tr key={subRow}>
              {index === 0 && (
                <td rowSpan={subRows?.length}>
                  {row}
                </td>
              )}
              <td>{subRow}</td>
              {colLabels.map((col) =>
                subColLabels[col]?.map((subCol: string) => (
                  <td key={subCol} style={getPivotCellStyles({
                    value: aggregatedData[row]?.[subRow]?.[col]?.[subCol],
                    min,
                    max
                  })}>
                    {formatPivotValue({value:aggregatedData[row]?.[subRow]?.[col]?.[subCol],formatType: 'm'}) ||
                      <span className={styles.empty}>-</span>}
                  </td>
                ))
              )}
            </tr>
          ));
        })}
        </tbody>
      </table>
    </div>
  );
};
