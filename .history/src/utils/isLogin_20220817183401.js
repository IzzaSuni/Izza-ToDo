import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import useQuery from "./Query";

const IsLogin = () => {
  const secret = process.env.REACT_APP_SECRET_TOKEN;
  const cookies = new Cookies();
  const bearer = cookies.get("akikToken");
  const signed = bearer ? jwtDecode(bearer).aud === secret : false;
  const user = bearer
    ? {
        user: jwtDecode(bearer).name,
        email: jwtDecode(bearer).email,
        isVerifiedEmail: jwtDecode(bearer).email_verified,
        userId: jwtDecode(bearer).user_id,
      }
    : {};

  return { signed, user };
};

export default IsLogin;
