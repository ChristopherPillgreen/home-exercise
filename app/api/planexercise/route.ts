import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import {
  getPlanExercises,
  addExerciseToPlan,
  updatePlanExercise,
  removeExerciseFromPlan,
} from './planexercise.service';

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// GET: Retrieve all exercises for a plan
export async function GET(request: NextRequest) {
  const planID = getQueryParam(request, 'planID');
  if (!planID) {
    return NextResponse.json({ message: 'planID is required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork()

    const exercises = await getPlanExercises(em, Number(planID));
    return NextResponse.json(exercises, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Add an exercise to a plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planID, exerciseID, ...exerciseData } = body;

    if (!planID || !exerciseID) {
      return NextResponse.json({ message: 'planID and exerciseID are required' }, { status: 400 });
    }

    const em = (await getOrm()).em.fork()

    const newPlanExercise = await addExerciseToPlan(em, Number(planID), Number(exerciseID), exerciseData);
    return NextResponse.json(newPlanExercise, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update an exercise in a plan
export async function PUT(request: NextRequest) {
  const planID = getQueryParam(request, 'planID');
  const exerciseID = getQueryParam(request, 'exerciseID');

  if (!planID || !exerciseID) {
    return NextResponse.json({ message: 'planID and exerciseID are required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const em = (await getOrm()).em.fork()

    const updatedPlanExercise = await updatePlanExercise(em, Number(planID), Number(exerciseID), body);
    return NextResponse.json(updatedPlanExercise, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove an exercise from a plan
export async function DELETE(request: NextRequest) {
  const planID = getQueryParam(request, 'planID');
  const exerciseID = getQueryParam(request, 'exerciseID');

  if (!planID || !exerciseID) {
    return NextResponse.json({ message: 'planID and exerciseID are required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork()

    const success = await removeExerciseFromPlan(em, Number(planID), Number(exerciseID));
    if (!success) {
      return NextResponse.json({ message: 'PlanExercise not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Exercise removed from plan successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
