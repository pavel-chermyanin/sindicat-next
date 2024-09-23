// Хук для использования мутации
import {useMutation} from "@tanstack/react-query";
import {login} from "./login-form.actions";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      // Преобразуем тип ошибки к unknown и затем к { detail: string }
      const errorMessage = (error as unknown as { message: { detail: string } }).message;

      // Проверяем значение detail
      return errorMessage.detail === 'LOGIN_BAD_CREDENTIALS' ? 'Неверный логин или пароль': errorMessage.detail;
    },
  });
};