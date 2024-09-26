'use client'

import {SelectPicker} from "rsuite";
import {Report} from "@/fsd/entities/report/report.types";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useGetReportsQueries} from "@/fsd/entities/report/report.queries";
import {useUserActions} from "@/fsd/entities/user";


type DataSelect = {
  label: string;
  value: number;
};

export const ChangeReportSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {user} = useUserActions()
  const {
    data,
    isSuccess,
    isFetching
  } = useGetReportsQueries(
    // если роль не админ запрашивать отчеты клиента из user
    user?.role !== 'admin'
      ? user?.client_id!
      : +searchParams.get('client_id')!)

  const [list, setList] = useState<DataSelect[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const transformedData = data.map(report => ({
        label: report.report_name,
        value: report.report_id,
      }));
      setList(transformedData);
    } else {
      setList([]); // Устанавливаем пустой список, если данных нет
    }
  }, [isSuccess,data]);

  const updateUrlParams = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'null') {
      params.set('report_id', value); // Устанавливаем параметр, если значение не пустое
      params.delete('group_id');
    } else {
      params.delete('report_id'); // Удаляем параметр, если значение пустое
      params.delete('group_id');
    }

    router.push(`?${params.toString()}`);
  };

  const getSelectedValue = () => {
    const value = searchParams.get('report_id');
    return value ? Number(value) : null;
  };

  return (
    <SelectPicker
      loading={isFetching}
      data={list}
      value={getSelectedValue()} // Привязываем значение селекта к значению из URL
      onChange={(value) => {
        updateUrlParams(value ? String(value) : null); // Обновляем URL при изменении отчета
      }}
      onClean={() => {
        updateUrlParams(null); // Очищаем report_id
      }}
    />
  );
};
