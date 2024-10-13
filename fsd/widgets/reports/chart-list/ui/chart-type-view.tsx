import {BarChart, ChartType, PivotChart} from "@/fsd/entities/chart";
import styles from './chart-type-view.module.scss'


export const ChartTypeView = ({chart}: { chart: ChartType }) => {
  let chartView
  // console.log(chart)
    switch (chart.formatting.type_chart) {
      case "bar":
        chartView = <BarChart chart={chart}/>
        break;
      case "pivot":
        chartView = <PivotChart chart={chart}/>
        break;
      default:
        chartView = <BarChart chart={chart}/>
        break;

  }


  return (
    <div className={styles.wrapper}>
      {chartView}
    </div>
  )
}