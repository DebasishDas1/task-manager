import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: any) => state.user.id);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
