export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  queryParams?: Record<string, string | number>;
  cache?: RequestCache; // Кеширование, например, 'no-store', 'reload', 'force-cache', 'only-if-cached'
  credentials?: RequestCredentials; // Опции авторизации, например, 'include', 'same-origin', 'omit'
  mode?: RequestMode; // Режим запроса, например, 'cors', 'no-cors', 'same-origin'
  redirect?: RequestRedirect; // Перенаправления, например, 'follow', 'error', 'manual'
  referrer?: string; // Заголовок 'Referrer'
  referrerPolicy?: ReferrerPolicy; // Политика 'Referrer'
  integrity?: string; // Политика целостности (Subresource Integrity)
  signal?: AbortSignal; // Поддержка отмены запроса
  keepalive?: boolean; // Для долгоживущих запросов, например, фоновых API
  revalidate?: number; // Интервал повторной проверки кэша (в секундах)
}

export const AUTH_URL = 'https://3e55-212-45-6-6.ngrok-free.app/auth'
export const BASE_URL = 'https://3e55-212-45-6-6.ngrok-free.app'

export async function apiClient(endpoint: string, options: FetchOptions = {}, authUrl?: boolean) {
  const baseUrl = authUrl ? AUTH_URL : BASE_URL; // Базовый URL для вашего API


  // Получаем токен из localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;


  // Дефолтные заголовки
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': !authUrl ? 'application/json' : 'application/x-www-form-urlencoded',
    "ngrok-skip-browser-warning": 'true',
    // 'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  // Если есть queryParams, добавляем их в URL
  let url = `${baseUrl}${endpoint}`;
  if (options.queryParams) {
    const queryParams = new URLSearchParams(
      Object.entries(options.queryParams).map(([key, value]) => [key, String(value)])
    );
    url += `?${queryParams}`;
  }

  // Обработка тела запроса
  let body: string | undefined;
  if (options.body && typeof options.body !== 'string') {
    console.log(options.body);
    body = JSON.stringify(options.body); // Сериализуем body как JSON, если он не строка
  } else {
    body = options.body;
  }

  const fetchOptions: RequestInit = {
    method: options.method || 'GET', // Передаем метод запроса
    headers: defaultHeaders,
    body, // Передаем тело запроса (сериализованное как JSON)
    credentials: options.credentials || 'include',
    mode: options.mode,
    redirect: options.redirect,
    referrer: options.referrer,
    referrerPolicy: options.referrerPolicy,
    integrity: options.integrity,
    signal: options.signal,
    keepalive: options.keepalive,
    next: {
      revalidate: options.revalidate || 1,
    },
  };

  // console.log('fetchOptions', fetchOptions, url);

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorData = await response.text(); // Получаем текст ошибки
    console.error('Ошибка API:', errorData);
    throw new Error(`API request failed: ${response.status} ${errorData}`);
  }

  return await response.json();
}


