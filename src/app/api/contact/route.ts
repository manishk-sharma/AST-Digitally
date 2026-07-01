import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, subject, message } = body;

    if (!firstName || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    console.log(`[Contact] Message from ${firstName} ${lastName} (${email})`);
    console.log(`[Contact] Subject: ${subject}`);
    console.log(`[Contact] Message: ${message}`);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
