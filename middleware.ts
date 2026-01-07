import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("auth");
  const isLogged = authCookie?.value === "true";

  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === "/login";
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/membros");

  if (!isLogged && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLogged && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/membros/:path*"],
};
