/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export interface TJwtPayload {
  email: string;
  userId: string;
  role: string;
  exp: number;
}

export interface IRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export const registerUser = async (userData: IRegister) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error registering user:", error);
    Error(error.message);
  }
};

export const loginUser = async (userData: ILogin) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("token", result?.data?.token);
      (await cookies()).set("user", JSON.stringify(result?.data?.user));
    }
    return result;
  } catch (error: any) {
    console.error("Error logging in:", error);
    Error(error.message);
  }
};

export const getCurrentUser = async () => {
  const user = (await cookies()).get("user")?.value;
  if (user) return JSON.parse(user);
  return null;
};

export const logout = async () => {
  (await cookies()).delete("token");
  (await cookies()).delete("user");
};

export const getDecodedToken = async (
  token: string
): Promise<TJwtPayload | null> => {
  try {
    const decoded = jwtDecode<TJwtPayload>(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = async (token: string): Promise<boolean> => {
  const decoded = await getDecodedToken(token);
  if (!decoded) return true;
  const currentTime = Date.now() / 1000; // convert milliseconds to seconds
  return decoded.exp < currentTime;
};

export const getUserFromToken = async (): Promise<TJwtPayload | null> => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  const decoded = await getDecodedToken(token);
  if (!decoded) return null;
  if (await isTokenExpired(token)) return null;
  return decoded;
};

export const getUserRole = async (): Promise<string | null> => {
  const user = await getUserFromToken();
  if (!user) return null;
  return user.role;
};

export const isUserLoggedIn = async (): Promise<boolean> => {
  const user = await getUserFromToken();
  return !!user;
};
