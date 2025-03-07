import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.access_token) {
      return NextResponse.json({ message: "Access token is required" }, { status: 400 });
    }

    // ✅ Store token in HTTP-only cookie for security
    const response = NextResponse.json({ message: "Admin token stored successfully" });
    response.headers.set(
      "Set-Cookie",
      `admin_token=${encodeURIComponent(body.access_token)}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict; ${
        process.env.NODE_ENV === "production" ? "Secure" : ""
      }`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Invalid request", error }, { status: 400 });
  }
}
