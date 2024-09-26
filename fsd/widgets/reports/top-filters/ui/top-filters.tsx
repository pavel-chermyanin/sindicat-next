'use client'

import {ChangeClientSelect} from "@/fsd/features/reports/change-client-select";
import {ChangeReportSelect} from "@/fsd/features/reports/change-report-select";
import {useUserActions} from "@/fsd/entities/user";


export const TopFilters =  () => {
  const {user} = useUserActions()

  return (
    <div className={'grid gap-2 grid-cols-2 max-w-96'}>
      {user?.role === 'admin' && <ChangeClientSelect />}
      <ChangeReportSelect />
    </div>
  );
}
