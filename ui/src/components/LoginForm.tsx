import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

import InputField from "./InputField";
import { loginUser } from "../api/loginUser";
import { setUser } from "../store/userSlice";

const userLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type UserLoginForm = z.infer<typeof userLoginSchema>;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({
    resolver: zodResolver(userLoginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ data }) => {
      toast.success("Logged in successfully!");
      dispatch(setUser(data.user));
      // localStorage.setItem("token", data.refreshToken);
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data || error.message);
    },
  });

  const onSubmit = (data: UserLoginForm) => mutation.mutate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-4 w-96"
    >
      <InputField
        type="email"
        placeholder="Email"
        registration={register("email")}
        error={errors.email}
      />
      <InputField
        type="password"
        placeholder="Password"
        registration={register("password")}
        error={errors.password}
      />
      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-black text-white p-2 rounded-lg disabled:opacity-50"
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
