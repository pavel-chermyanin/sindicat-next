
import {ChangeClientSelect} from "@/fsd/features/reports/change-client-select";
import {ChangeReportSelect} from "@/fsd/features/reports/change-report-select";


export const TopFilters = async () => {

  return (
    <div className={'grid gap-2 grid-cols-2 max-w-96'}>
      <ChangeClientSelect />
      <ChangeReportSelect />
    </div>
  );
}
