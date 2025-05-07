import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "./services/auth.service";

// Routes accessible only when NOT authenticated.
const authOnlyRoutes = ["/login", "/register"];

// Define common routes accessible by any authenticated user.
// const commonRoutes: RegExp[] = [/^\/rental-details/];

// Define role-based private route regex patterns.
const roleBasedRoutes: Record<string, RegExp[]> = {
  landlord: [/^\/landlord/, /^\/post-rental-house/],
  tenant: [/^\/tenant/, /^\/rental-request/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Redirect if already authenticated and trying to access auth-only routes.
  if (authOnlyRoutes.includes(pathname)) {
    const user = await getUserFromToken();
    if (user) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_APP_URL}/`, request.url)
      );
    }
    return NextResponse.next();
  }

  // For all other routes, ensure the user is authenticated.
  const user = await getUserFromToken();
  if (!user) {
    const loginUrl = new URL(
      `${process.env.NEXT_PUBLIC_APP_URL}/login?redirectPath=${pathname}`,
      request.url
    );
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to common routes for any authenticated user.
  // if (commonRoutes.some((regex) => regex.test(pathname))) {
  //   return NextResponse.next();
  // }

  // Check role-based access for other routes.
  const allowedRoutes = roleBasedRoutes[user.role] || [];
  const isAllowed = allowedRoutes.some((regex) => regex.test(pathname));
  if (isAllowed) return NextResponse.next();

  // Redirect unauthorized users to the homepage.
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/post-rental-house",
    // "/rental-details",
    // "/rental-details/:path*",
    "/rental-request",
    "/rental-request/:path*",
    "/admin",
    "/landlord",
    "/tenant",
    "/admin/:path*",
    "/landlord/:path*",
    "/tenant/:path*",
  ],
};
