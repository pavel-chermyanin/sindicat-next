import {AxiosError} from 'axios'; // Импортируем AxiosError, если используете Axios

export const getErrorMessage = (error: unknown): string => {
  // Проверяем, если error является объектом Error и получаем его сообщение
  if (error instanceof AxiosError) {

    return error.response?.data?.detail?.includes('ClickHouse error')
      ? 'По выбранным фильтрам данных нет'
      : 'Ошибка обработки данных'; // Используем опциональную цепочку
  }

  // Проверяем, если error является объектом Error и получаем его сообщение
  if (error instanceof Error) {
    return error.message; // Возвращаем сообщение ошибки
  }

  // Проверяем, если error является строкой
  if (typeof error === 'string') {
    return error;
  }

  // Возвращаем сообщение по умолчанию, если тип ошибки неизвестен
  return 'Произошла неизвестная ошибка';
};
