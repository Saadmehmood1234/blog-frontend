// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// type JwtPayload = {
//   id: string;
//   email: string;
//   role: "admin" | "user";
//   exp: number;
// };

// export const getCookies = async () => {
//   const token = (await cookies()).get("jwt")?.value;
//   if (!token) {
//     return null;
//   }
//   try {
//     const userPayload = jwtDecode<JwtPayload>(token);
//     return userPayload;
//   } catch {
//     return null;
//   }
// };


import { cookies } from "next/headers";
import { API_BASE_URL } from "./ApiBaseUrl";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (!cookieHeader || !API_BASE_URL) {
    return null;
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/auth/me`,
      {
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.user ?? null;
  } catch {
    return null;
  }
};

