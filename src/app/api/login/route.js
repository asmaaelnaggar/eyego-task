import { NextResponse } from "next/server";

export async function POST(req) {

  const body = await req.json();
  const { email, password } = body;

  if (email === "admin@test.com" && password === "123456") {

    const response = NextResponse.json({
      success: true,
      user: {
        id: 1,
        name: "Admin User",
        email
      }
    });

    response.cookies.set("token", "mock-jwt-token", {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}