import { useEffect } from 'react';
import { Swiper as SwiperClass } from 'swiper';

export const useHandleWheel = (swiperRef: React.RefObject<SwiperClass | null>) => {
  // console.log(swiperRef.current.el)
  useEffect(() => {
      // console.log(swiperRef)
    const handleWheel = (event: WheelEvent) => {
      if (!swiperRef.current) return;

      // Prevent default scroll behavior
      event.preventDefault();

      if (event.deltaY > 0) {
        swiperRef.current.slideNext();
      } else if (event.deltaY < 0) {
        swiperRef.current.slidePrev();
      }
    };

    const swiperEl = swiperRef.current?.el;
    if (swiperEl) {
      swiperEl.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (swiperEl) {
        swiperEl.removeEventListener('wheel', handleWheel);
      }
    };
  }, [swiperRef.current]);
};
