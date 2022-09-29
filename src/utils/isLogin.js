import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";

const IsLogin = () => {
  const secret = process.env.REACT_APP_SECRET_TOKEN;
  const cookies = new Cookies();
  const bearer = cookies.get("akikToken");
  const signed = bearer ? jwtDecode(bearer).aud === secret : false;
  const uname = localStorage.getItem("uname");
  const user = bearer
    ? {
        user: uname ? uname : jwtDecode(bearer).name,
        email: jwtDecode(bearer).email,
        isVerifiedEmail: jwtDecode(bearer).email_verified,
        userId: jwtDecode(bearer).user_id,
        picture: jwtDecode(bearer).picture,
      }
    : {};

  return { signed, user };
};

export default IsLogin;
