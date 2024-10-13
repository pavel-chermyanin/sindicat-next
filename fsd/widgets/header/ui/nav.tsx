'use client'

import React, {useEffect, useState} from "react";
import {Message, Nav} from "rsuite";
import Link from 'next/link';
import {usePathname, useRouter} from "next/navigation";
import {Routing} from "@/fsd/shared/config/routing";
import {useUserActions, useUserMeQueries} from "@/fsd/entities/user";
import {getErrorMessage} from "@/fsd/shared/types/get-error-message.type-guard";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Получаем текущий путь
  const {data, isSuccess, error} = useUserMeQueries();
  const {setUser} = useUserActions();
  const [active, setActive] = useState<string>(pathname); // Инициализация активного элемента

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    // Предзагрузка страницы /reports при загрузке страницы /
    router.prefetch('/reports');
  }, [router]);

  // Устанавливаем активный элемент при монтировании компонента
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const message = error ? (
    <div style={{position: 'absolute', zIndex: 1000}}>
      <Message showIcon type={'error'} closable>
        <strong>{getErrorMessage(error)}</strong>
      </Message>
    </div>
  ) : null;

  return (
    <>
      {/*{message}*/}
      <Nav activeKey={active}>
        <Nav.Item as={Link} href={Routing.HOME} eventKey={Routing.HOME}>Главная</Nav.Item>
        <Nav.Item as={Link} href={Routing.REPORTS} eventKey={Routing.REPORTS}>Отчеты</Nav.Item>
      </Nav>
    </>
  );
};
