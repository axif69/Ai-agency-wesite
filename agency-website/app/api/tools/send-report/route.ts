import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    if (raw.length > 12000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });

    const body = JSON.parse(raw);
    const name = String(body.name || "").trim().slice(0, 100);
    const email = String(body.email || "").trim().slice(0, 180);
    const company = String(body.company || "").trim().slice(0, 140);
    const phone = String(body.phone || "").trim().slice(0, 50);
    const tool = String(body.tool || "Free AI Tool").trim().slice(0, 100);
    const summary = String(body.summary || "").trim().slice(0, 3000);
    const consent = body.consent === true;

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !consent) {
      return NextResponse.json({ error: "Please provide a valid name, email and consent." }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) return NextResponse.json({ error: "Report delivery is temporarily unavailable." }, { status: 503 });

    const formData = new FormData();
    formData.append("access_key", accessKey.trim());
    formData.append("name", name);
    formData.append("email", email);
    formData.append("company", company || "Not provided");
    formData.append("phone", phone || "Not provided");
    formData.append("tool", tool);
    formData.append("message", summary || "The visitor requested a review of their tool result.");
    formData.append("subject", `${tool} lead from ${name}`);
    formData.append("from_name", "Asif Digital Free Tools");

    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const result = await response.json();
    if (!result.success) throw new Error("Web3Forms rejected the submission");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tool lead error:", error);
    return NextResponse.json({ error: "Unable to send the report right now." }, { status: 500 });
  }
}

