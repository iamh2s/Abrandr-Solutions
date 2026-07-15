import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { eq, asc } from "drizzle-orm";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const all = await db.select().from(projects).orderBy(asc(projects.sortOrder));
  return Response.json(all);
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const [row] = await db.insert(projects).values({
      slug: body.slug,
      title: body.title,
      client: body.client,
      category: body.category,
      description: body.description,
      challenge: body.challenge,
      solution: body.solution,
      image: body.image || "/images/work/novapay-dashboard.jpg",
      gradient: body.gradient || "from-red-500/20 to-red-400/20",
      tags: body.tags || "",
      metricsJson: body.metricsJson || "[]",
      published: body.published ?? false,
      sortOrder: body.sortOrder ?? 0,
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
    const [row] = await db.update(projects).set({
      slug: body.slug, title: body.title, client: body.client,
      category: body.category, description: body.description,
      challenge: body.challenge, solution: body.solution,
      image: body.image, gradient: body.gradient, tags: body.tags,
      metricsJson: body.metricsJson, published: body.published,
      sortOrder: body.sortOrder, updatedAt: new Date(),
    }).where(eq(projects.id, body.id)).returning();
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
  await db.delete(projects).where(eq(projects.id, parseInt(id)));
  return Response.json({ success: true });
}
