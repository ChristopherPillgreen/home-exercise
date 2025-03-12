// pages/api/verify-plan.ts
import { NextRequest, NextResponse } from 'next/server';
import { getOrm } from 'mikro-orm.config';
import { Plan } from '@entities/Plan.entity';
import { getUserById } from '@api/User/User.service';

export interface IUser {
  id: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  // add other relevant fields
}

// Helper to extract query parameters
function getQueryParam(request: NextRequest, param: string): string | null {
  const { searchParams } = new URL(request.url);
  return searchParams.get(param);
}

export async function GET(request: NextRequest) {
  // Create a forked entity manager from MikroORM
  const em = (await getOrm()).em.fork();
  
  // Retrieve planID and userID from query params
  const planID = getQueryParam(request, 'planID');
  const userID = getQueryParam(request, 'userID');

  if (!planID || !userID) {
    return NextResponse.json(
      { message: 'planID and userID are required' },
      { status: 400 }
    );
  }

  try {
    // Retrieve the plan and eagerly load the user relation.
    // Note: Adjust the query criteria to match your Plan entity's primary key.
    const plan = await em.findOne(Plan, { planID: Number(planID) }, { populate: ['user'] });
    if (!plan) {
      return NextResponse.json({ message: 'Plan not found' }, { status: 404 });
    }
    
    // Use the getUserById method from your user service to retrieve the user.
    const user = await getUserById(em, String(userID));
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare the user from the plan with the user retrieved from the user service.
    // Adjust the field names as needed depending on your entity definitions.
    if (!plan.user || plan.user.userID !== user.userID) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    return NextResponse.json({ exists: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error verifying plan association:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
