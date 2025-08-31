import api from "../lib/api";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
