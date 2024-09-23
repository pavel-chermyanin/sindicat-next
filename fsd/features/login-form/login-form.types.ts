export type AuthForm = {
  username: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  // refreshToken: string;
};