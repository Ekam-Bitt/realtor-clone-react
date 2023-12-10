import { Outlet, Navigate } from "react-router";
import {useAuthStatus} from "../hooks/useAuthStatus";
import Loading from "./Loading";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Loading />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/Sign-In" />;
}
