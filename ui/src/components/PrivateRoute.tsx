import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const user = useSelector((state: any) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
