import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, "admin@abrandr.com")).limit(1);
    if (existing.length > 0) {
      return Response.json({ message: "Admin user already exists." });
    }
    await db.insert(adminUsers).values({
      email: "admin@abrandr.com",
      passwordHash: hashPassword("admin123"),
      name: "aBrandr Admin",
    });
    return Response.json({ message: "Admin user created: admin@abrandr.com / admin123" });
  } catch (error) {
    console.error("Seed error:", error);
    return Response.json({ error: "Failed to seed" }, { status: 500 });
  }
}
