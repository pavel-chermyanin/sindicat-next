import {useMutation} from "@tanstack/react-query";
import {login} from "./login-form.actions";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      // Преобразуем тип ошибки к unknown и затем проверим на наличие сообщения
      const errorMessage = (error as unknown as { message?: { detail: string } })?.message;

      // Проверяем, существует ли сообщение об ошибке и detail
      const errorResponse = errorMessage?.detail === 'LOGIN_BAD_CREDENTIALS'
        ? 'Неверный логин или пароль'
        : 'Неизвестная ошибка';
      return errorResponse;
    },
  });
};
