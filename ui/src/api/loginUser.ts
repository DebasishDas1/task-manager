import api from "../lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
