import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import {
  createPlan,
  addExerciseToPlan,
  getPlanById,
  getAllPlans,
  getExercisesForPlan,
  getPlansByUserId,
  deletePlan
} from './Plan.service';
import { PlanExercise } from '@entities/PlanExercise.entity';
import { EntityManager } from '@mikro-orm/mysql';

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// GET: Fetch a plan by ID or all plans
export async function GET(request: NextRequest) {
  const em = (await getOrm()).em.fork()
  const id = getQueryParam(request, 'id');
  const userID = getQueryParam(request, 'userID');


  try {
    if (id) {
      const plan = await getPlanById(em, Number(id));
      if (!plan) {
        return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
      }
      return NextResponse.json(plan, { status: 200 });
    } else if (userID) {
      const plans = await getPlansByUserId(em, String(userID))
      return NextResponse.json(plans, {status: 200});
    } else {
      const plans = await getAllPlans(em);
      return NextResponse.json(plans, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new plan
export async function POST(request: NextRequest) {
  const em = (await getOrm()).em.fork()
  const body = await request.json();

  const { userID, ...data } = body;

  try {
    const newPlan = await createPlan(em, userID, data);
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Add exercise to a plan
export async function PUT(request: NextRequest) {
    console.log("put handler is triggered");
    const em = (await getOrm()).em.fork()
  const body = await request.json();

    console.log("body", body);
  const { planID, exerciseID, ...data } = body;

  // try {
  //   const updatedPlanExercise = await addExerciseToPlan(em, planID, exerciseID, data);
  //   return NextResponse.json(updatedPlanExercise, { status: 200 });
  // } catch (error: any) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
  if (!planID || !exerciseID) {
    return NextResponse.json(
      { message: 'Both planID and exerciseID are required' },
      { status: 400 }
    );
  }

  try {
    // Call the service function to add the exercise to the plan
    const updatedPlanExercise = await addExerciseToPlan(em, Number(planID), Number(exerciseID), data);

    // Respond with the updated plan
    return NextResponse.json(updatedPlanExercise, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

}

export async function DELETE(request: NextRequest){
  try {
    const {searchParams} = new URL(request.url);
    const planIDParam = searchParams.get('planID');

    if (!planIDParam) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    const planID = Number(planIDParam);
    if (isNaN(planID)) {
      return NextResponse.json({ error: 'Invalid plan ID' }, { status: 400 });
    }

    const em = (await getOrm()).em.fork()

    await deletePlan(em, planID);

    return NextResponse.json({ success: true }, {status:200});



  } catch(error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, {status: 500})
  }
}

// GET: Fetch exercises for a specific plan


