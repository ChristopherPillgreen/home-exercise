import { NextRequest, NextResponse } from "next/server";
import {
  getExerciseById,
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from "./exercise.service";

// Handle GET requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")
    ? parseInt(searchParams.get("id")!)
    : undefined;

  try {
    if (id) {
      const exercise = await getExerciseById(id);
      if (!exercise)
        return NextResponse.json(
          { message: "Exercise not found" },
          { status: 404 }
        );
      return NextResponse.json(exercise, { status: 200 });
    } else {
      const exercises = await getAllExercises();
      return NextResponse.json(exercises, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle POST requests
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newExercise = await createExercise(body);
    return NextResponse.json(newExercise, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle PUT requests
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")
    ? parseInt(searchParams.get("id")!)
    : undefined;

  if (!id)
    return NextResponse.json(
      { message: "ID is required for update" },
      { status: 400 }
    );

  try {
    const body = await request.json();
    const updatedExercise = await updateExercise(id, body);
    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")
    ? parseInt(searchParams.get("id")!)
    : undefined;

  if (!id)
    return NextResponse.json(
      { message: "ID is required for deletion" },
      { status: 400 }
    );

  try {
    const deleteMessage = await deleteExercise(id);
    return NextResponse.json(deleteMessage, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
