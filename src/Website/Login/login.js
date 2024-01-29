import { auth, provider } from "../../firebase-config";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Cookies from "universal-cookie";
import { AuthContext } from "../../context/AuthContext";
export default function Login() {
  let navigate = useNavigate();
  const cookie = new Cookies();

  const authContext = useContext(AuthContext);
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        authContext.setIsAuth(true);
        cookie.set("isAuth", true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Header />
      <div className="login-page">
        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </>
  );
}
