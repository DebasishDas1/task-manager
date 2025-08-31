import MyHeader from "../components/MyHeader";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/registerUser";
import { toast } from "sonner";

const userRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserRegisterForm = z.infer<typeof userRegisterSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterForm>({
    resolver: zodResolver(userRegisterSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success(`Registered successfully! Please log in. ${data.message}`);
    },
    onError: (error: any) => {
      toast.error(error.response?.data || error.message);
    },
  });

  const onSubmit = (data: UserRegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <MyHeader title="User Registration" />
      <div className="rounded-2xl border border-gray-300 p-10 shadow-2xl mb-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-4 w-96"
        >
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 p-2 rounded-lg"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

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
            Register
          </button>
        </form>
      </div>
      <div>
        if not logged in click on{" "}
        <Link className="text-green-600 font-black" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
