import IsLogin from "../utils/isLogin";

export default function Profile() {
  const { user, signed } = IsLogin();
  return <>user.user</>;
}
