"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarPlus } from "lucide-react";
// import { ExampleApiUsage } from "@/components/example-api-usage";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <MakeCall />
      <Calls />
    </main>
  );
}

const MakeCall = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        AI Phone Screen Operator Console
      </h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Start New Call</CardTitle>
            <CardDescription>
              Initiate an automated phone screen with a candidate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CandidateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Calls = () => {
  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold mb-6">Recent Calls</h2>
      <RecentCalls />
    </div>
  );
};

const makeCandidateCall = async (data: { name: string; phone: string }) => {
  const response = await fetch("/api/makeCall", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to initiate call");
  }

  return response.json();
};

const CandidateForm = () => {
  const handleMakeCall = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      // Let the browser show validation errors
      form.reportValidity();
      return;
    }

    // Handle form submission logic here
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value;
    console.log("Name:", name, "Phone:", phone);

    try {
      await makeCandidateCall({ name, phone });
    } catch (error) {
      console.error("Error making call:", error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleMakeCall} noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter candidate name"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter phone number"
          required
        />
      </div>
      <Button type="submit">Start Call</Button>
    </form>
  );
};

const RecentCalls = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>
          View transcripts and details from previous screening calls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">TODO: Implement call logs table</p>
      </CardContent>
    </Card>
  );
};
