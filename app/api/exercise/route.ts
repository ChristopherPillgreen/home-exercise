import { NextRequest, NextResponse } from 'next/server';
import {
  getExerciseById,
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
} from './exercise.service';
import { getOrm } from 'mikro-orm.config';

interface ExerciseData {
  exerciseName: string;
  exerciseDescription: string;
  image: string;
}



function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

function handleErrorResponse(error: any) {
  return NextResponse.json({ error: error.message }, { status: 500 });
  
}

export async function GET(request: NextRequest) {
  const id = getQueryParam(request, 'id');

  try {
    const em = (await getOrm()).em.fork() 

    if (id) {
      const exercise = await getExerciseById(em, Number(id));
      if (!exercise) {
        return NextResponse.json(
          { message: 'Exercise not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(exercise, { status: 200 });
    } else {
      const exercises = await getAllExercises(em);
      return NextResponse.json(exercises, { status: 200 });
    }
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  console.log('post');
  try {
    const em = (await getOrm()).em.fork()

    const body: ExerciseData = await request.json();
    const newExercise = await createExercise(em, body);
    return NextResponse.json(newExercise, { status: 201 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

export async function PUT(request: NextRequest) {
  console.log('put');
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required for update' },
      { status: 400 }
    );
  }

  try {
    const em = (await getOrm()).em.fork()

    const body: Partial<ExerciseData> = await request.json();
    const updatedExercise = await updateExercise(em, Number(id), body);
    return NextResponse.json(updatedExercise, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  console.log('delete')
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json(
      { message: 'ID is required for deletion' },
      { status: 400 }
    );
  }

  try {
    const em = (await getOrm()).em.fork()

    const deleteMessage = await deleteExercise(em, Number(id));
    return NextResponse.json(deleteMessage, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}
