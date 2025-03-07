import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth.service";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  landlord: [/^\/landlord/],
  tenant: [/^\/tenant/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  const userRole = userInfo.role;
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    roleBasedPrivateRoutes[userRole as Role].some((regex) =>
      regex.test(pathname)
    )
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:page",
    "/landlord",
    "/landlord/:page",
    "/tenant",
    "/tenant/:page",
  ],
};
