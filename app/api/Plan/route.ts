import { NextRequest, NextResponse } from 'next/server';
//import { getOrm } from '../../../mikro-orm.config';
import { orm } from 'mikro-orm.config';
import {
  getPlanById,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from './Plan.service';

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
    //const orm = await getOrm(); // Initialize Mikro-ORM
    const em = (await orm).em.fork();

    const body = await request.json();
    const { userID, ...planData } = body;

    if (!userID) {
      return NextResponse.json({ message: 'userID is required' }, { status: 400 });
    }

    const newPlan = await createPlan(em, userID, planData);
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update an existing plan by ID
export async function PUT(request: NextRequest) {
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required for update' }, { status: 400 });
  }

  try {
    //const orm = await getOrm(); // Initialize Mikro-ORM
    const em = (await orm).em.fork();

    const body = await request.json();
    const updatedPlan = await updatePlan(em, Number(id), body);

    if (!updatedPlan) {
      return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a plan by ID
export async function DELETE(request: NextRequest) {
  const id = getQueryParam(request, 'id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required for deletion' }, { status: 400 });
  }

  try {
    //const orm = await getOrm(); // Initialize Mikro-ORM
    const em = (await orm).em.fork();

    const success = await deletePlan(em, Number(id));
    if (!success) {
      return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
