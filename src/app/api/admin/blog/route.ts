import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  return Response.json(posts);
}

export async function POST(request: Request) {
  const user = await requireAdmin();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const [post] = await db.insert(blogPosts).values({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      readTime: body.readTime || "5 min read",
      gradient: body.gradient || "from-red-500/20 to-red-400/20",
      published: body.published ?? false,
      publishedAt: body.published ? new Date() : null,
    }).returning();
    return Response.json(post);
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
    const [post] = await db.update(blogPosts).set({
      slug: body.slug,
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      readTime: body.readTime,
      gradient: body.gradient,
      published: body.published,
      publishedAt: body.published ? new Date() : null,
      updatedAt: new Date(),
    }).where(eq(blogPosts.id, body.id)).returning();
    return Response.json(post);
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
  await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)));
  return Response.json({ success: true });
}
