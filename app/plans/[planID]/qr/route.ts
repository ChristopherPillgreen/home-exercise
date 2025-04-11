import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { planID: string } }) {
  const { searchParams } = new URL(request.url);
  const encodedData = searchParams.get("data");

  if (!encodedData) {
    return NextResponse.json({ error: "No data available" }, { status: 400 });
  }

  try {
    const decodedData = atob(decodeURIComponent(encodedData)); // Decode the Base64 data
    const compactData = JSON.parse(decodedData);

    return NextResponse.json(compactData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  }
}