const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const API_BASE_URL =
  typeof window === "undefined" ? backendUrl : "/backend-api";
