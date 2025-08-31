import { Link, useNavigate } from "react-router";
import MyHeader from "../components/MyHeader";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/loginUser";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { toast } from "sonner";

const userLoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserLoginForm = z.infer<typeof userLoginSchema>;

const Login = () => {
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
      console.log("✅ User logged in successfully:", data);
      toast.success("Logged in successfully!");
      navigate("/");

      // store user in Redux
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.refreshToken);
    },
    onError: (error: any) => {
      console.error("❌ Login failed:", error.response?.data || error.message);
      toast.error(error.response?.data || error.message);
    },
  });

  const onSubmit = (data: UserLoginForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <MyHeader title="User Login" />
      <div className="rounded-2xl border border-gray-300 p-10 shadow-2xl mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4 w-96"
        >
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 p-2 rounded-lg"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-300 p-2 rounded-lg"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button type="submit" className="bg-black text-white p-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
      <div>
        if you do not have a account click on{" "}
        <Link className="text-green-600 font-black" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
