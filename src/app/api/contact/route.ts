import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await db.insert(contactSubmissions).values({
      name,
      email,
      company: company || null,
      service: service || null,
      budget: budget || null,
      message,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
