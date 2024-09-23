'use client'

import React, {ReactNode, useLayoutEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {Loader} from "rsuite";
import {ACCESS_TOKEN} from "@/fsd/core/global.constants";

const ProtectedRoute = ({children}: { children: ReactNode }) => {
  const router = useRouter();
  const [tokenState, setTokenState] = useState('')

  useLayoutEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Получение токена из localStorage
    if (!token) {
      setTokenState('')
      router.replace('/auth'); // Перенаправление на страницу логина, если токен отсутствует
    } else {
      setTokenState(token)
    }
  }, [router]);

  return (
    <>
      {
        tokenState
          ? children
          : (
            <div
              className={'h-screen flex items-center justify-center'}>
              <Loader size={'md'}/>
            </div>
          )
      }
    </>
  ); // Если токен есть, отобразить дочерние компоненты
};

export default ProtectedRoute;