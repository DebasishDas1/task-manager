import { Link } from "react-router";
import MyHeader from "../components/MyHeader";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col">
      <MyHeader title="User Login" />
      <div className="rounded-2xl border border-gray-300 p-10 shadow-2xl mb-10">
        <LoginForm />
      </div>
      <div>
        If you don’t have an account, click{" "}
        <Link className="text-green-700 font-black" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
