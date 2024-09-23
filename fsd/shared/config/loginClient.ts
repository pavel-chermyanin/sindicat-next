import axios from "axios";
import {ACCESS_TOKEN} from "@/fsd/core/global.constants";

export const LOGIN_API = 'https://3e55-212-45-6-6.ngrok-free.app/auth'


const createAxiosLoginInstance = () => {
  const instance = axios.create({
    baseURL: LOGIN_API,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Language': 'ru',
      "ngrok-skip-browser-warning": 'true',
    },
    withCredentials: true
  });

  // Добавляем интерсепторы для обработки ошибок
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Добавляем интерсептор для обработки ошибок ответа
  instance.interceptors.response.use(
    (response) => response, // Если запрос успешный, просто возвращаем ответ
    (error) => {
      if (error.response) {
        // Если сервер вернул ошибку, проверяем статус
        if (error.response.status === 400) {
          // console.log(error.response)
          // Прокидываем ошибку выше
          return Promise.reject(new Error(error.response.data.detail));
        }
      }
      // Прокидываем другие ошибки
      return Promise.reject(error);
    }
  );

  return instance;
};

export const loginClient = createAxiosLoginInstance();