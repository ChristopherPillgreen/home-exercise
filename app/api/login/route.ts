import { loginUser } from "./login.service"; 
import { getOrm } from "mikro-orm.config";
import { NextRequest, NextResponse } from "next/server";

function handleErrorResponse(error: any) {
  console.error("Error occurred:", error.message);
  return NextResponse.json(
    { error: error.message || "An unexpected error occurred" },
    { status: 500 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const em = (await getOrm()).em.fork()
    const {
      userEmail,
      userPassword,
    }: { userEmail: string; userPassword: string } = await request.json();

    const user = await loginUser(em, userEmail, userPassword);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 } 
      );
    }

    return NextResponse.json(
      { message: "Login successful", userId: user.userID },
      { status: 200 }
    );
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}
