"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = true;
      if (!token) {
        router.push("/");
      }
    }, []);

    // Here you can also check user role and redirect accordingly

    return <Component {...props} />;
  };
}
