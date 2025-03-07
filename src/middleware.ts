import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "./services/auth.service";

// * Define routes that should only be accessible when NOT authenticated.
const authOnlyRoutes = ["/login", "/register"];

// * Define role-based private route regex patterns.
const roleBasedRoutes: Record<string, RegExp[]> = {
  landlord: [/^\/landlord/],
  tenant: [/^\/tenant/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // * If the route is an auth-only route, redirect if user is already authenticated.
  if (authOnlyRoutes.includes(pathname)) {
    const user = await getUserFromToken();
    if (user) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/`, request.url)
      );
    }
    return NextResponse.next();
  }

  // * For other routes, check if a valid token exists.
  const user = await getUserFromToken();
  if (!user) {
    const loginUrl = new URL(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirectPath=${pathname}`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  // * Check role-based access for authenticated user.
  const allowedRoutes = roleBasedRoutes[user.role] || [];
  const isAllowed = allowedRoutes.some((regex) => regex.test(pathname));
  if (isAllowed) return NextResponse.next();

  // * If user role doesn't match the route, redirect to homepage.
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin",
    "/landlord",
    "/tenant",
    "/admin/:path*",
    "/landlord/:path*",
    "/tenant/:path*",
  ],
};
