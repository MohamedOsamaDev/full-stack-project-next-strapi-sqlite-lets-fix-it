"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "@src/hooks/useAuth";
import LoadingPage from "@src/components/shared/loadingPage/LoadingPage";

export const AuthManager = ({ children, next = "/", Auth = false }) => {
  const { isAuth, logOut } = useAuth();
  const router = useRouter();

  const checkAuth = async () => {
    if (isAuth && !Auth) {
      router.replace(next);
    }
    if (!isAuth && Auth) {
      router.replace(`/sign-up?next=${next}`);
    }
  };
  useEffect(() => {
    checkAuth();
  }, [isAuth, Auth, next]);
  if ((!isAuth && !Auth) || (!isAuth && Auth)) return <LoadingPage />;
  return children;
};
