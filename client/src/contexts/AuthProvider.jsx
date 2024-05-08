"use client";
import { useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import useAuth from "@src/hooks/useAuth";
import { AuthRoutes, unAuthRoutes } from "@src/routes";

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuth, logOut } = useAuth();
    const isAuthCookies = Cookies.get("jwt");
    const redirectToHome = unAuthRoutes.includes(pathname) && isAuth;
    const redirectToLogIn = AuthRoutes.includes(pathname) && !isAuth;
    useEffect(() => {
        if (redirectToHome) {
            router.push("/");
        }
        if (redirectToLogIn) {
            router.push("/log-in");
        }
        if (!isAuthCookies && isAuth) {
            logOut();
        }
    }, [pathname]);
    if (redirectToHome || redirectToLogIn) return "loading...";
    return children;
};
