import { NextRequest, NextResponse } from 'next/server';
import {
  getPlanById,
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from './Plan.service';

// GET: Retrieve a plan by ID or all plans
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const plan = await getPlanById(Number(id));
      if (!plan) {
        return NextResponse.json({ message: "Plan not found" }, { status: 404 });
      }
      return NextResponse.json(plan, { status: 200 });
    } else {
      const plans = await getAllPlans();
      return NextResponse.json(plans, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Create a new plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newPlan = await createPlan(body);
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PUT: Update an existing plan by ID
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required for update" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updatedPlan = await updatePlan(Number(id), body);
    return NextResponse.json(updatedPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Delete a plan by ID
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required for deletion" }, { status: 400 });
  }

  try {
    const deleteMessage = await deletePlan(Number(id));
    return NextResponse.json(deleteMessage, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
