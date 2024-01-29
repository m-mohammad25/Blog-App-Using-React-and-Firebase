import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";
export default function Header() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const logOut = async () => {
    authContext.setIsAuth(false);
    cookie.remove("isAuth");
    navigate("/login");
  };
  return (
    <>
      <div className="header">
        <div className="logo">logo</div>
        <nav>
          <Link to="/">Home</Link>
          {!authContext.isAuth ? (
            <Link to="/login">Login</Link>
          ) : (
            <>
              <Link to="/create-post">Create Post</Link>
              <button className="btn btn-light btn-sm" onClick={logOut}>
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}
