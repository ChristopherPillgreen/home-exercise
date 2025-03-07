 
import { NextRequest, NextResponse } from "next/server";
import { getOrm } from 'mikro-orm.config'; // Adjust the path to your Mikro-ORM configuration
import {
  getPlanById,
  getAllPlans,
  createPlan,
  deletePlan,
  addExerciseToPlan,
  removeExerciseFromPlan,
} from "../app/api/Plan/Plan.service";
import { parseIsolatedEntityName } from "typescript";

// Helper: Parse query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

// Helper: Handle errors
function handleErrorResponse(error: any) {
  console.error("Error in Plan route:", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}

// GET: Retrieve a plan by ID or all plans
export async function GET(request: NextRequest) {
  const id = getQueryParam(request, "id");

  try {
    const em = (await getOrm()).em.fork()

    if (id) {
      const plan = await getPlanById(em, Number(id));
      if (!plan) {
        return NextResponse.json(
          { message: "Plan not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(plan, { status: 200 });
    } else {
      const plans = await getAllPlans(em);
      return NextResponse.json(plans, { status: 200 });
    }
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// POST: Create a new plan
export async function POST(request: NextRequest) {
  try {
    const em = (await getOrm()).em.fork()
    
    const body = await request.json();
    const { userID, frequency, favorites, planName } = body;

    if (!userID || typeof frequency !== "number" || typeof favorites !== "boolean") {
      return NextResponse.json(
        { message: "Invalid request data. Ensure userID, frequency, and favorites are provided." },
        { status: 400 }
      );
    }

    const newPlan = await createPlan(em, userID, { frequency, favorites, planName });
    return NextResponse.json(newPlan, { status: 201 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// PUT: Update a plan or add an exercise to a plan
export async function PUT(request: NextRequest) {
  try {
    const em = (await getOrm()).em.fork()

    const body = await request.json();
    const { planID, exerciseID, sequenceNum, reps, sets, duration, time } = body;

    if (!planID || !exerciseID) {
      return NextResponse.json(
        { message: "planID and exerciseID are required" },
        { status: 400 }
      );
    }

    const result = await addExerciseToPlan(em, planID, exerciseID, {
      sequenceNum,
      reps,
      sets,
      duration,
      time,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

// DELETE: Remove a plan or an exercise from a plan
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;

  try {
    const em = (await getOrm()).em.fork()

    // Handle deleting an exercise from a plan
    if (path.endsWith("/exercise")) {
      const body = await request.json();
      const { planID, exerciseID } = body;

      if (!planID || !exerciseID) {
        return NextResponse.json(
          { message: "planID and exerciseID are required" },
          { status: 400 }
        );
      }

      const result = await removeExerciseFromPlan(em, planID, exerciseID);
      return NextResponse.json(result, { status: 200 });
    }

    // Handle deleting an entire plan
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID is required for deletion" },
        { status: 400 }
      );
    }

    const success = await deletePlan(em, Number(id));
    if (!success) {
      return NextResponse.json(
        { message: "Plan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Plan deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return handleErrorResponse(error);
  }
}

