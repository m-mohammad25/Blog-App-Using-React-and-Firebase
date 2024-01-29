import { useContext } from "react";
import Cookies from "universal-cookie";
import { Outlet, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function RequireAuth() {
  const cookie = new Cookies();
  const isAuth = cookie.get("isAuth");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (isAuth) {
    authContext.setIsAuth(true);
    return <Outlet />;
  } else navigate("/login");
}
