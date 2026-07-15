import { db } from "@/db";
import { careerApplications } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, position, experience, portfolio, coverLetter } = body;

    if (!name || !email || !position || !coverLetter) {
      return Response.json(
        { error: "Name, email, position, and cover letter are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await db.insert(careerApplications).values({
      name,
      email,
      phone: phone || null,
      position,
      experience: experience || null,
      portfolio: portfolio || null,
      coverLetter,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Career application error:", error);
    return Response.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}
