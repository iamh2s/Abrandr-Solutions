import { db } from "@/db";
import { contactSubmissions, careerApplications } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "contact";
  if (type === "career") {
    const rows = await db.select().from(careerApplications).orderBy(desc(careerApplications.createdAt));
    return Response.json(rows);
  }
  const rows = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  return Response.json(rows);
}
