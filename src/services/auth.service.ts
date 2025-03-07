/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export interface IRegister {
  name: string;
  email: string;
  phone: number;
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
    console.error("Error registering user:", error.message);
    return Error(error);
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
    return Error(error);
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
