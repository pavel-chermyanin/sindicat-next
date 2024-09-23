import {useEffect, useRef} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {Swiper as SwiperClass} from 'swiper';
import {Group} from '@/fsd/entities/group/group.types';

export const useHandleActiveGroup = (groups: Group[] = [], swiperRef: React.RefObject<SwiperClass | null>) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const groupIdFromParams = searchParams.get('group_id');
    if (!groupIdFromParams && groups.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('group_id', String(groups[0].group_id));
      router.replace(`?${params.toString()}`);
    }
  }, [searchParams, groups, router, swiperRef]);

  useEffect(() => {
    const groupIdFromParams = searchParams.get('group_id');
    if (groupIdFromParams) {
      const groupIndex = groups.findIndex(group => group.group_id === Number(groupIdFromParams));
      if (groupIndex !== -1 && swiperRef.current) {
        swiperRef.current.slideTo(groupIndex);
      }
    }
  }, []);

};
