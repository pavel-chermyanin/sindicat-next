import {TopFilters} from "@/fsd/widgets/reports/top-filters";
import {ChangeGroupTabs} from "@/fsd/features/reports/change-group-tabs";
import {ChartList} from "@/fsd/widgets/reports/chart-list";
import {GroupFilters} from "@/fsd/features/reports/group-filters";
import {DrawerCreateChart} from "@/fsd/widgets/reports/drawer-create-chart";
import {DrawerFilters} from "@/fsd/widgets/reports/drawer-filters";
import {DrawerCreateGroup} from "@/fsd/widgets/reports/drawer-create-group";
import {DrawerEditGroup} from "@/fsd/widgets/reports/drawer-edit-group";
import {DrawerCreatePresentation} from "@/fsd/widgets/reports/drawer-create-presentation";


export default async function ReportPage() {


  return (
    <div>
      <TopFilters/>
      <ChangeGroupTabs/>
      <GroupFilters/>
      <ChartList/>

      <DrawerCreateChart/>
      <DrawerFilters/>
      <DrawerCreateGroup/>
      <DrawerEditGroup/>
      <DrawerCreatePresentation/>
    </div>
  );
}
// export const dynamic = 'force-dynamic'
