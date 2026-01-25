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


export const getCurrentUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
};
