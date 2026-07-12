import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message } = body;

    if (!firstName || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    // Persist to database
    await db.contactSubmission.create({
      data: {
        firstName,
        lastName: lastName ?? null,
        email,
        phone: phone ?? null,
        subject,
        message,
        status: "NEW",
        isRead: false,
      },
    });

    console.log(`[Contact] Saved submission from ${firstName} ${lastName ?? ""} (${email})`);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
