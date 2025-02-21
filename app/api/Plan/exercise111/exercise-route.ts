import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikroOrmConfig';
import { removeExerciseFromPlan } from '../Plan.service';

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
