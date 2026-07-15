import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE = "admin_session";
const SECRET = process.env.ADMIN_SECRET || "abrandr-admin-secret-key-2024";

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + SECRET).digest("hex");
}

export function createSessionToken(userId: number): string {
  const payload = `${userId}:${Date.now()}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

export function verifySessionToken(token: string): number | null {
  try {
    const decoded = Buffer.from(token, "base64").toString();
    const parts = decoded.split(":");
    if (parts.length !== 3) return null;
    const [userId, timestamp, hmac] = parts;
    const payload = `${userId}:${timestamp}`;
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    if (hmac !== expected) return null;
    const age = Date.now() - parseInt(timestamp);
    if (age > 7 * 24 * 60 * 60 * 1000) return null; // 7 day expiry
    return parseInt(userId);
  } catch {
    return null;
  }
}

export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const userId = verifySessionToken(token);
  if (!userId) return null;
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
  return user || null;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) {
    return null;
  }
  return user;
}
