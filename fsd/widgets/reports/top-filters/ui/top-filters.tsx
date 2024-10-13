'use client'

import {ChangeClientSelect} from "@/fsd/features/reports/change-client-select";
import {ChangeReportSelect} from "@/fsd/features/reports/change-report-select";
import {ToggleEditableMode} from "@/fsd/features/reports/toggle-editable-mode";
import {SettingsAdmin} from "@/fsd/features/reports/settings-admin";


export const TopFilters = () => {


  return (
    <div className={'flex'}>
      <div className={'mr-auto grid grid-cols-2 max-w-[400px] w-full gap-2'}>
        <ChangeClientSelect/>
        <ChangeReportSelect/>
      </div>

      <div className={'flex gap-2'}>
        <ToggleEditableMode/>
        <SettingsAdmin/>
      </div>

    </div>
  );
}
