import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File | null;

    if (!name || !email || !resume) {
      return NextResponse.json({ error: "Name, email, and resume are required" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads", "careers");
    await mkdir(uploadDir, { recursive: true });

    const ext = resume.name.split(".").pop() || "pdf";
    const filename = `${Date.now()}-${name.replace(/\s+/g, "-")}.${ext}`;
    const bytes = await resume.arrayBuffer();
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

    console.log(`[Careers] Application from ${name} (${email}) for "${position}" — resume saved: ${filename}`);

    return NextResponse.json({ success: true, message: "Application submitted successfully!" });
  } catch (err) {
    console.error("[Careers] Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
