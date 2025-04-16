import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import { getServerSession } from 'next-auth';
import { authOptions } from "@api/authOptions/authOptions";

import {
  getPlanExercises,
  addExerciseToPlan,
  updatePlanExercise,
  removeExerciseFromPlan,
} from './planexercise.service';

function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions); 

  if (!session || !session.user) {
    return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
  }

  const planID = getQueryParam(request, 'planID');
  if (!planID) {
    return NextResponse.json({ message: 'planID is required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork();
    const exercises = await getPlanExercises(em, Number(planID), session.user.id);
    return NextResponse.json(exercises, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions); 

  if (!session || !session.user) {
    return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { planID, exerciseID, ...exerciseData } = body;

    if (!planID || !exerciseID) {
      return NextResponse.json({ message: 'planID and exerciseID are required' }, { status: 400 });
    }

    const em = (await getOrm()).em.fork();
    const newPlanExercise = await addExerciseToPlan(em, Number(planID), Number(exerciseID), session.user.id, exerciseData);
    return NextResponse.json(newPlanExercise, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { planID, exercises } = body;

  if (!planID || !Array.isArray(exercises) || exercises.length === 0) {
    return NextResponse.json({ message: 'planID and exercises are required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork();
    const updatedExercises = [];

    for (const exercise of exercises) {
      const updatedPlanExercise = await updatePlanExercise(
        em,
        Number(planID),
        exercise.exerciseID,
        session.user.id,
        { ...exercise } 
      );
      updatedExercises.push(updatedPlanExercise);
    }

    return NextResponse.json(updatedExercises, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions); 

  if (!session || !session.user) {
    return NextResponse.json({ message: 'User is not authenticated' }, { status: 401 });
  }

  const planID = getQueryParam(request, 'planID');
  const exerciseID = getQueryParam(request, 'exerciseID');

  if (!planID || !exerciseID) {
    return NextResponse.json({ message: 'planID and exerciseID are required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork();
    const success = await removeExerciseFromPlan(em, Number(planID), Number(exerciseID), session.user.id);
    if (!success) {
      return NextResponse.json({ message: 'PlanExercise not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Exercise removed from plan successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
