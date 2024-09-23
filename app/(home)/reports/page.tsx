import {TopFilters} from "@/fsd/widgets/reports/top-filters";
import {ChangeGroupTabs} from "@/fsd/features/reports/change-group-tabs";
import {ChartList} from "@/fsd/widgets/reports/chart-list";
import {GroupFilters} from "@/fsd/features/reports/group-filters";


export default async function ReportPage() {
  return (
    <div>
      <TopFilters/>
      <ChangeGroupTabs/>
      <GroupFilters/>
      <ChartList/>
    </div>
  );
}
