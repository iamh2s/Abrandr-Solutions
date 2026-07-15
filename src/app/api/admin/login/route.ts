import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return Response.json({ error: "Email and password are required." }, { status: 400 });
    }
    const hash = hashPassword(password);
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    if (!user || user.passwordHash !== hash) {
      return Response.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const token = createSessionToken(user.id);
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return Response.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
