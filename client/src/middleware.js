import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { AuthRoutes, unAuthRoutes } from "./routes";
import isIncludes from "./utils/isIncludes";

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("jwt")?.value || null;

  const isAuth = token ? true : false;

  // Redirect logic

  if (isIncludes(pathname, AuthRoutes) && !isAuth) {
    const res = NextResponse.redirect(
      new URL(`/sign-up?next=${pathname.toString()}${search}`, request.nextUrl)
    );

    return res;
  }

  if (isIncludes(pathname, unAuthRoutes) && isAuth) {
    const res = NextResponse.redirect(new URL("/", request.nextUrl));

    return res;
  }

  return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
