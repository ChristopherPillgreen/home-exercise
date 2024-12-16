import { NextRequest, NextResponse } from 'next/server';
//import { getOrm } from '../../../mikro-orm.config';
import { orm } from 'mikro-orm.config';
import {
  getPlanById,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
  addExerciseToPlan,
  removeExerciseFromPlan
} from './Plan.service';

console.log('in route for plan');
// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// GET: Retrieve a plan by ID or all plans
export async function GET(request: NextRequest) {
  
  const id = getQueryParam(request, 'id');

  try {
    //const orm = await getOrm(); // Initialize Mikro-ORM
    const em = (await orm).em.fork();

    if (id) {
      const plan = await getPlanById(em, Number(id));
      if (!plan) {
        return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
      }
      return NextResponse.json(plan, { status: 200 });
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
  try {
    const em = (await orm).em.fork(); // Fork Mikro-ORM entity manager
    console.log('Processing POST request for Plan creation...');

    // Parse and validate the request body
    const body = await request.json();
    const { userID, frequency, favorites } = body;

    if (!userID || typeof frequency !== 'number' || typeof favorites !== 'boolean') {
      return NextResponse.json(
        { message: 'Invalid request data. Ensure userID, frequency, and favorites are provided.' },
        { status: 400 }
      );
    }

    // Create a new plan
    const newPlan = await createPlan(em, userID, { frequency, favorites });
    return NextResponse.json(newPlan, { status: 201 });

  } catch (error: any) {
    console.error('Error in POST /api/Plan:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  try {
    const em = (await orm).em.fork();
    const body = await request.json();

    const { planID, exerciseID, sequenceNum, reps, sets, duration, time } = body;

    // Validate input
    if (!planID || !exerciseID) {
      return NextResponse.json(
        { message: 'planID and exerciseID are required' },
        { status: 400 }
      );
    }
    
    // Add exercise to the plan
    const result = await addExerciseToPlan(em, planID, exerciseID, {
      sequenceNum,
      reps,
      sets,
      duration,
      time,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// // DELETE: Delete a plan by ID
// export async function DELETE(request: NextRequest) {
//   const id = getQueryParam(request, 'id');

//   if (!id) {
//     return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
//   }

//   try {
//     //const orm = await getOrm(); // Initialize Mikro-ORM
//     const em = (await orm).em.fork();

//     const success = await deletePlan(em, Number(id));
//     if (!success) {
//       return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Plan deleted successfully' }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
  
// }

export async function DELETE(request: NextRequest) {
  console.log("in delete");
  const url = new URL(request.url);
  const path = url.pathname;

  const em = (await orm).em.fork();

  // Handle deleting an exercise from a plan
  if (path.endsWith('/exercise')) {
    try {
      
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
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  // Handle deleting an entire plan
  try {
    console.log("in DELETE", path);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
    }

    const success = await deletePlan(em, Number(id));
    if (!success) {
      return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}