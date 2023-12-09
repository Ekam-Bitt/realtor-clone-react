import { Outlet, Navigate } from "react-router";
import {useAuthStatus} from "../hooks/useAuthStatus";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <div>Checking Status...</div>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/Sign-In" />;
}
