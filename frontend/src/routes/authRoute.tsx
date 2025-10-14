import { useTypedSelector } from "@/app/hook";
import { Navigate, Outlet } from "react-router-dom";
import { PROTECTED_ROUTES } from "./common/routePath";

const AuthRoute = () => {
  const { accessToken, user } = useTypedSelector((state) => state.auth);

  // If user is logged in, redirect to overview
  if (accessToken && user) {
    return <Navigate to={PROTECTED_ROUTES.OVERVIEW} replace />;
  }

  // Otherwise, render the login page
  return <Outlet />;
};


export default AuthRoute;