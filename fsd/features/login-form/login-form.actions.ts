
import {AuthForm, AuthResponse} from "./login-form.types";
import {loginClient} from "@/fsd/shared/config/loginClient";


export const login = async (formData: AuthForm) => {
  const response = await loginClient.post(`/auth/jwt/login`,formData)
  return response.data
}