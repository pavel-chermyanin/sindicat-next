import { Layouts, Layout } from "react-grid-layout";

export const generateChartInitialState = (itemCount: number): Layouts => {
  const layout: Layout[] = Array.from({ length: itemCount }, (_, index) => ({
    i: String(index), // уникальный идентификатор
    x: (index % 2) * 6, // два элемента в строке, по 6 единиц ширины каждый
    y: Math.floor(index / 2) * 2, // каждые два элемента на новой строке
    w: 6, // ширина элемента (половина ширины контейнера)
    h: 2, // высота элемента
    minW: 3, // минимальная ширина
    minH: 2, // минимальная высота
    maxW: 12, // максимальная ширина
    static: false, // элемент можно перемещать
  }));

  // Обновляем первый элемент
  if (layout.length > 0) {
    layout[0] = {
      i: "0", // первый элемент должен сохранять свой индекс
      x: 0,
      y: 0,
      w: 6, // ширина элемента
      h: 2, // высота элемента
      minW: 3,
      minH: 2,
      maxW: 12,
      static: false, // элемент также должен перемещаться
    };
  }

  return { lg: layout };
};

