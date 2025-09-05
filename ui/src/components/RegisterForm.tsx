import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

import InputField from "./InputField";
import { registerUser } from "../api/registerUser";

const userRegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserRegisterForm = z.infer<typeof userRegisterSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();

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
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.response?.data || error.message);
    },
  });

  const onSubmit = (data: UserRegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 mt-4 w-96"
    >
      <InputField
        type="text"
        placeholder="Name"
        registration={register("name")}
        error={errors.name}
      />
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
        {mutation.isPending ? "Registration pending.." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
