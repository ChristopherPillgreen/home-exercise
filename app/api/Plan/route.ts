import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import {
  createPlan,
  addExerciseToPlan,
  getPlanById,
  getAllPlans,
  getExercisesForPlan,
  getPlansByUserId,
  deletePlan,
  updatePlan
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

  const { userID, planName, ...data } = body;

  if (!planName) {
    return NextResponse.json({ error: "Plan name is required" }, { status: 400 });
  }

  try {
    const newPlan = await createPlan(em, userID, { ...data, planName });
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update an existing plan or add an exercise to a plan

export async function PUT(request: NextRequest) {
  console.log("PUT handler triggered");
  const em = (await getOrm()).em.fork();
  const body = await request.json();
  console.log("body", body);

  // Destructure planID and exerciseID, along with the rest of the update data.
  const { planID, exerciseID, ...data } = body;

  if (!planID) {
    return NextResponse.json(
      { message: "planID is required" },
      { status: 400 }
    );
  }

  // If exerciseID is provided, update the join table or add the exercise to the plan.
  if (exerciseID) {
    try {
      const updatedPlanExercise = await addExerciseToPlan(
        em,
        Number(planID),
        Number(exerciseID),
        data
      );
      return NextResponse.json(updatedPlanExercise, { status: 200 });
    } catch (error: any) {
      console.error("Error in addExerciseToPlan:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Otherwise, update just the plan.
    try {
      const updatedPlan = await updatePlan(em, Number(planID), data);
      return NextResponse.json(updatedPlan, { status: 200 });
    } catch (error: any) {
      console.error("Error in updatePlan:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
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


