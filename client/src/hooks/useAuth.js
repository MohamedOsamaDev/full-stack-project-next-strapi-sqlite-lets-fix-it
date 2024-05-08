import { logIn, logout } from "@src/redux/slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const useAuth = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const isAuthCookies = Cookies.get("jwt");
  const dispatch = useDispatch();
  const router = useRouter();
  const logOut = async () => {
    Cookies.remove("jwt");
    dispatch(logout());
    router.push("/");
    router.refresh();
  };
  const signIn = async ({ jwt, next }) => {
    Cookies.set("jwt", jwt, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    }); // Expires in 7 days with secure flag
    dispatch(logIn());
    router.push(next);
    router.refresh();
  };
  // useEffect(() => {
  //   const check = async () => {
  //     const res = await fetch(`/api/auth`);
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   check();
  // }, []);
  return {
    isAuth: isAuth && isAuthCookies,
    signIn,
    logOut,
    jwt: isAuthCookies,
  };
};

export default useAuth;
