// app/api/makeCall/route.ts (App Router)
import { NextResponse } from "next/server";
import { VapiClient } from "@vapi-ai/server-sdk";

const ASSISTANT_ID = "";
const vapi = new VapiClient({
  token: "",
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
