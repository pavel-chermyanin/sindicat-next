'use client'

import React, {useEffect, useState} from "react";
import {Nav} from "rsuite";
import {useRouter, usePathname} from "next/navigation";
import {Routing} from "@/fsd/shared/config/routing";
import {useUserMeQueries} from "@/fsd/entities/user";

export const Navbar: React.FC = () => {
  const pathname = usePathname(); // Получаем текущий путь
  const {push, prefetch} = useRouter();
  const {data} = useUserMeQueries()
  const [active, setActive] = useState<string>(pathname); // Инициализация активного элемента

  // // Предзагрузка маршрутов при загрузке приложения
  // useEffect(() => {
  //   prefetch(Routing.HOME);    // Предзагрузка главной страницы
  //   prefetch(Routing.REPORTS); // Предзагрузка страницы отчетов
  // }, [prefetch]);

  // Устанавливаем активный элемент при монтировании компонента
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  // Функция для обработки выбора элемента
  const handleSelect = (eventKey: string) => {
    push(eventKey); // Изменение URL
  };

  return (
    <Nav activeKey={active} onSelect={handleSelect}>
      <Nav.Item eventKey={Routing.HOME}>Главная</Nav.Item>
      <Nav.Item eventKey={Routing.REPORTS}>Отчеты</Nav.Item>
      {/*<Nav.Item eventKey={Routing.REPORTS_LIST}>Список отчетов</Nav.Item>*/}
    </Nav>
  );
};
