import { db } from "@/db";
import { jobOpenings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(jobOpenings).orderBy(asc(jobOpenings.sortOrder));
  return Response.json(all);
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const [row] = await db.insert(jobOpenings).values({
      title: body.title, department: body.department,
      location: body.location, type: body.type || "Full-time",
      description: body.description, requirements: body.requirements || "",
      published: body.published ?? false, sortOrder: body.sortOrder ?? 0,
    }).returning();
    return Response.json(row);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const [row] = await db.update(jobOpenings).set({
      title: body.title, department: body.department,
      location: body.location, type: body.type,
      description: body.description, requirements: body.requirements,
      published: body.published, sortOrder: body.sortOrder,
      updatedAt: new Date(),
    }).where(eq(jobOpenings.id, body.id)).returning();
    return Response.json(row);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Server error";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await db.delete(jobOpenings).where(eq(jobOpenings.id, parseInt(id)));
  return Response.json({ success: true });
}
