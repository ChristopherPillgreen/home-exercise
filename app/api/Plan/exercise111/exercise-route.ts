import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';

import { removeExerciseFromPlan, getExercisesForPlan } from '../Plan.service';


function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}
export async function DELETE(request: NextRequest) {
  try {
    const em = (await getOrm()).em.fork()
    const body = await request.json();
    const { planID, exerciseID } = body;

    if (!planID || !exerciseID) {
      return NextResponse.json(
        { message: 'planID and exerciseID are required' },
        { status: 400 }
      );
    }

    const result = await removeExerciseFromPlan(em, planID, exerciseID);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error in DELETE /Plan/exercise:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
  export async function GET_EXERCISES(request: NextRequest) {
    const em = (await getOrm()).em.fork()
    const planID = getQueryParam(request, 'planID');
  
    if (!planID) {
      return NextResponse.json({ message: 'planID is required' }, { status: 400 });
    }
  
    try {
      const exercises = await getExercisesForPlan(em, Number(planID));
      return NextResponse.json(exercises, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
