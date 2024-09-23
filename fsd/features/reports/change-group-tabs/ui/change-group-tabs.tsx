'use client'

import styles from './change-group-tabs.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import React, {useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Mousewheel, Keyboard} from 'swiper/modules';
import {Swiper as SwiperClass} from 'swiper';
import {useHandleActiveGroup} from '../hooks/use-handle-active-group';  // Путь к вашему хук-файлу
import {useHandleWheel} from '../hooks/use-handle-wheel';  // Путь к вашему хук-файлу
import {useSearchParams, useRouter} from 'next/navigation';
import {Group} from "@/fsd/entities/group";
import {useGetGroupsQueries} from "@/fsd/entities/group/group.queries";
import {Loader} from "rsuite";

export const ChangeGroupTabs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {data: groups, isFetching} = useGetGroupsQueries(+searchParams.get('report_id')!)
  const swiperRef = useRef<SwiperClass | null>(null);

  // Используем кастомные хуки
  useHandleActiveGroup(groups, swiperRef);
  useHandleWheel(swiperRef);


  const handleItemClick = (groupId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('group_id', String(groupId));
    // params.delete('filters')
    router.push(`?${params.toString()}`);
  };



  return (
    <div className={styles.wrapper}>
      <Swiper
        onSwiper={(swiperInstance) => {
          swiperRef.current = swiperInstance;
        }}
        cssMode={true}
        navigation={true}
        slidesPerView="auto"
        slidesPerGroupAuto={true}
        keyboard={true}
        modules={[Navigation, Mousewheel, Keyboard]}
        spaceBetween={12}
        className={styles.swiper}
      >
        {groups?.map((group) => (
          <SwiperSlide
            className={styles.swiper_slide}
            key={group.group_id}
          >
            <div
              className={`${styles.carouselItem} ${searchParams.get('group_id') === String(group.group_id) ? styles.active : ''}`}
              onClick={() => handleItemClick(group.group_id)}
            >
              <p>{group.group_name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
