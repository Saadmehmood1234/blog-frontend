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

export const getCurrentUser = async () => {
  const cookieStore =await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
    {
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
};

