
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("GET /api/export endpoint was called");
  return NextResponse.json({ message: "Hello from export API" });
}

