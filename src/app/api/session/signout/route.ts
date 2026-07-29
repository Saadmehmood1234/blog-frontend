import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export async function POST(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  let status = 200;
  let body = JSON.stringify({
    success: true,
    message: "Logout Successfully",
  });

  if (backendUrl && token) {
    const upstream = await fetch(`${backendUrl}/api/v1/auth/signout`, {
      method: "POST",
      headers: { cookie: `jwt=${token}` },
      cache: "no-store",
    });
    status = upstream.status;
    body = await upstream.text();
  }

  const response = new NextResponse(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
  response.cookies.set("jwt", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
