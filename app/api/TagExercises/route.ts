import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import {
  getTagsForExercise,
  getExercisesForTag,
  addTagToExercise,
  removeTagFromExercise,
} from './TagExercises.service';


function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

export async function GET(request: NextRequest) {
  const exerciseID = getQueryParam(request, 'exerciseID');
  const tagID = getQueryParam(request, 'tagID');

  if (!exerciseID && !tagID) {
    return NextResponse.json({ message: 'Either exerciseID or tagID is required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork()

    if (exerciseID) {
      const tags = await getTagsForExercise(em, Number(exerciseID));
      return NextResponse.json(tags, { status: 200 });
    } else if (tagID) {
      const exercises = await getExercisesForTag(em, Number(tagID));
      return NextResponse.json(exercises, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { exerciseID, tagID } = body;

    if (!exerciseID || !tagID) {
      return NextResponse.json({ message: 'exerciseID and tagID are required' }, { status: 400 });
    }

    const em = (await getOrm()).em.fork()

    const tagExercise = await addTagToExercise(em, Number(exerciseID), Number(tagID));
    return NextResponse.json(tagExercise, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const exerciseID = getQueryParam(request, 'exerciseID');
  const tagID = getQueryParam(request, 'tagID');

  if (!exerciseID || !tagID) {
    return NextResponse.json({ message: 'exerciseID and tagID are required' }, { status: 400 });
  }

  try {
    const em = (await getOrm()).em.fork()

    const success = await removeTagFromExercise(em, Number(exerciseID), Number(tagID));
    if (!success) {
      return NextResponse.json({ message: 'TagExercise not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Tag removed from exercise successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
