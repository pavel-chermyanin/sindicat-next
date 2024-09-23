import {HomeSearchParams} from "@/fsd/shared/types/HomeSearchParams";
import React, {Suspense} from "react";
import {ChangeGroupTabs} from "@/fsd/features/reports/change-group-tabs";
import {TopFilters} from "@/fsd/widgets/reports/top-filters";
import {getGroups, Group} from "@/fsd/entities/group";
import {BarChartType, ChartFormatting} from "@/fsd/entities/chart";
import {ChartList} from "@/fsd/widgets/reports/chart-list";
import {ChartType} from "@/fsd/entities/chart/types/chart.types";
import {Filter, getFilters} from "@/fsd/entities/filter";
import {GroupFilters} from "@/fsd/features/reports/group-filters"; // Импорт компонента для отображения графиков

// Заглушка для отображения, если данных нет
const FallbackComponent = () => {
  return <div>Данные отсутствуют</div>;
};

export default async function ReportPage({searchParams}: { searchParams: HomeSearchParams }) {
  // let groups: Group[] = [];
  // let chartsData: BarChartType[] = []; // Для хранения данных графиков
  // let chartsFormatting: ChartFormatting[] = []; // Для хранения форматирования графиков
  // let charts: ChartType[] = []; // для объеденения полей графиков
  // let filters: Filter[] = []
  // let activeGroup: Group | null = null
  //
  //
  // // Получаем список групп, если report_id определен
  // if (searchParams.report_id) {
  //   groups = await getGroups(searchParams.report_id);
  //
  //   // Если в URL есть group_id, получаем данные для графиков
  //   const groupId = searchParams.group_id;
  //   if (groupId) {
  //     activeGroup = groups.find(group => group.group_id === +groupId)!
  //     filters = await getFilters({group_id: searchParams.group_id});
  //
  //   }
  // }
  // console.log(charts)

  return (
    <div>
      <TopFilters />
      <ChangeGroupTabs/>
      <ChartList />
      {/*<Suspense fallback={<div>Загрузка групп...</div>}>*/}
      {/*  {searchParams.report_id && (*/}
      {/*    <>*/}
      {/*      {groups.length > 0 ? (*/}
      {/*        <>*/}
      {/*          <ChangeGroupTabs groups={groups}/>*/}
      {/*          <GroupFilters filters={filters}/>*/}
      {/*          <ChartList searchParams={searchParams} activeGroup={activeGroup}/>*/}
      {/*        </>*/}
      {/*      ) : (*/}
      {/*        <FallbackComponent/>*/}
      {/*      )}*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</Suspense>*/}


    </div>
  );
}
