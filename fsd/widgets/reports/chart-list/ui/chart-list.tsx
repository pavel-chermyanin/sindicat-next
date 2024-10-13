'use client'

import {BarChart,  useCombinedChartsData} from "@/fsd/entities/chart";
import styles from './chart-list.module.scss'
import cl from 'classnames'
import {useFilterActions} from "@/fsd/entities/filter";
import {Heading, HeadingGroup, Loader, useMediaQuery} from "rsuite";
import {CustomHeading} from "@/fsd/shared/ui/CustomHeading";
import {Group} from "@/fsd/entities/group";
import {CustomText} from "@/fsd/shared/ui/CustomText";
import {useSearchParams} from "next/navigation";
import {useGetGroupsQueries} from "@/fsd/entities/group/api/group.queries";
import {useState} from "react";
import {getErrorMessage} from "@/fsd/shared/types/get-error-message.type-guard";
import {ChartGridLayout} from "@/fsd/features/react-grid-layout";
import {ChartTypeView} from "@/fsd/widgets/reports/chart-list/ui/chart-type-view";
import {ChartType} from "@/fsd/entities/chart/types/chart.types";


export const ChartList = () => {

  const searchParams = useSearchParams()
  const [isTablet] = useMediaQuery('(max-width: 1200px)');
  const {filters: FilterForm} = useFilterActions()
  const {data: groups, isFetching} = useGetGroupsQueries(+searchParams.get('report_id')!)
  const {data: combinedData, isLoading, error} = useCombinedChartsData(+searchParams.get('group_id')!, FilterForm);

  const [activeGroup, setActiveGroup] = useState<Group | null>(null)

  if (isLoading) {
    return <div className={'flex items-center justify-center mt-6'}><Loader size={'md'}/></div>
  }
  return (

    <div className={styles.wrapper}>
      <HeadingGroup className={'text-center'}>
        <CustomHeading level={5}>{activeGroup?.group_name}</CustomHeading>
        <CustomText>{activeGroup?.description}</CustomText>
      </HeadingGroup>
      {error && (
        getErrorMessage(error)
      )}
      <div className={cl(styles.grid, {
        [styles.col_2]: combinedData.length % 2 === 0,
        [styles.col_3]: Boolean(combinedData.length % 2),
        [styles.isTablet]: isTablet
      })}>

        <ChartGridLayout>
          {combinedData.map(chart => {
            return (
              <div className={styles.grid_item} key={chart.id}>
                <CustomHeading level={6}>{chart.title}</CustomHeading>
                <ChartTypeView chart={chart}/>
              </div>
            )
          })}
        </ChartGridLayout>

      </div>
    </div>

  )
}