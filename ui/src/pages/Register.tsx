import { Link } from "react-router";
import MyHeader from "../components/MyHeader";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <MyHeader title="User Registration" />
      <div className="rounded-2xl border border-gray-300 p-10 shadow-2xl mb-10">
        <RegisterForm />
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
