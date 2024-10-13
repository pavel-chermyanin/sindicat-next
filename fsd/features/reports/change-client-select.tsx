'use client'

import {SelectPicker} from "rsuite";
import {Client} from "@/fsd/entities/client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {Routing} from "@/fsd/shared/config/routing";
import {useGetClientsQueries} from "@/fsd/entities/client/client.queries";
import * as sea from "node:sea";
import {useUserActions} from "@/fsd/entities/user";

type DataSelect = {
  label: string;
  value: number;
};

export const ChangeClientSelect = () => {
  const router = useRouter();
  const {user} = useUserActions()
  const searchParams = useSearchParams();
  const {data, isSuccess} = useGetClientsQueries()
  const [list, setList] = useState<DataSelect[]>([]);

  useEffect(() => {
    if (isSuccess) {
      const transformedData = data.map(client => ({
        label: client.client_name,
        value: client.client_id,
      }));
      setList(transformedData);
    }
  }, [isSuccess]);

  const updateUrlParams = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'null') {
      router.push(`${Routing.REPORTS}?client_id=${value}`);
    } else {
      router.push(`${Routing.REPORTS}`);
    }

  };

  const getSelectedValue = () => {
    const value = searchParams.get('client_id');
    return value ? Number(value) : null;
  };

  if (user?.role !== 'admin') {
    return null
  }

  return (
    <SelectPicker
      data={list}
      value={getSelectedValue()} // Привязываем значение селекта к значению из URL
      onChange={(value) => {
        updateUrlParams(value ? String(value) : null); // Обновляем URL и очищаем report_id при изменении клиента
      }}
      onClean={() => {
        updateUrlParams(null); // Очищаем client_id и report_id
      }}
    />
  )
}
