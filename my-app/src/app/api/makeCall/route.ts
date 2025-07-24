// app/api/makeCall/route.ts (App Router)
import { NextResponse } from "next/server";
import { VapiClient } from "@vapi-ai/server-sdk";

const ASSISTANT_ID = "9536e304-105c-4365-b922-8ccdaa0d0088";
const vapi = new VapiClient({
  token: "98aa2e5a-a3af-4abf-b881-96a3119bb394",
});

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone } = body;

  console.log("Received:", phone, name);

  try {
    const call = await vapi.calls.create({
      assistantId: ASSISTANT_ID,
      phoneNumberId: "7cece006-2ae4-40b5-bef0-99395eaa958e",
      customer: {
        number: phone, // Target phone number
      },
    });

    return NextResponse.json({ success: true, call });
  } catch (err: any) {
    console.error("Vapi error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
