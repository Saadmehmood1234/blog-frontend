import { NextRequest, NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export async function POST(request: NextRequest) {
  if (!backendUrl) {
    return NextResponse.json(
      { success: false, message: "Backend API URL is not configured" },
      { status: 500 },
    );
  }

  const upstream = await fetch(`${backendUrl}/api/v1/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await request.text(),
    cache: "no-store",
  });

  const response = new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });

  const token = upstream.headers.get("set-cookie")?.match(/jwt=([^;]+)/)?.[1];
  if (token) {
    response.cookies.set("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 24 * 60 * 60,
      path: "/",
    });
  }

  return response;
}
