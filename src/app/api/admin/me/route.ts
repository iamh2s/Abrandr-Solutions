import { getAdminUser } from "@/lib/auth";

export async function GET() {
  const user = await getAdminUser();
  if (!user) return Response.json({ error: "Not authenticated" }, { status: 401 });
  return Response.json({ id: user.id, name: user.name, email: user.email });
}
